import React, { useState, useCallback, ChangeEvent } from 'react';
import { postActivity, validateActivity } from './MergerFormApi';
import { mergeGpxFiles } from '../../utils/MergeGpxFiles';
import Loader from '../Loader/Loader';
import FileUpload from '../Field/FileUpload';

type Files = {
  file1: File | null,
  file2: File | null
};
const DEFAULT_ERROR = 'There was an error posting your activity. Please try again.'
const WRONG_TYPE_ERROR = 'Invalid file type. Please upload a valid GPX file.'
const validateInputType = (file: File):boolean => file.type === 'application/gpx+xml' || file.name.endsWith('.gpx');

export default function MergerForm() {
  const [files, setFiles] = useState<Files>({file1: null, file2: null});
  const [loader, setLoader] = useState({ isLoading: false, info: 'Loading..'});
  const [error, setError] = useState('');
  const [successLink, setSuccessLink] = useState('');

  /**
   * Handles file drop event to update state with dropped file
   * @param e
   */
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    const uploadId = e.currentTarget.id;

    if (!uploadId || !e.dataTransfer.files || e.dataTransfer.files.length === 0 ) {
      setError(DEFAULT_ERROR);
      return;
    }

    const uploadedFile = e.dataTransfer.files[0];
    if (validateInputType(uploadedFile)) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [uploadId]: uploadedFile
      }));
    } else {
      setError(WRONG_TYPE_ERROR);
    }
  }, []);

  /**
   * Handles file input change event to update state with selected file
   * @param e
   */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>):void => {
    const { name, files } = e.currentTarget;

    if (files === null || !name || files.length < 1 ) {
      setError(DEFAULT_ERROR);
      return;
    }

    if (validateInputType(files[0])) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: files[0]
      }));
    } else {
      setError(WRONG_TYPE_ERROR);
    }
  }, []);

  /**
   * Handles form submission to merge and post files
   * @param e
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!files.file1 || !files.file2) {
      setError('Please upload both files before submitting.')
      return;
    }

    try {
      setError('');
      setLoader({ isLoading: true, info: 'Posting your activity to Strava...' });
      const formData = new FormData(e.currentTarget);
      const gpxFile = await mergeGpxFiles(files.file1, files.file2);
      formData.append('file', gpxFile);
      const response = await postActivity(formData);
      const { id, status, error: postError } = response.data;

      if (postError) {
        setError(postError);
        setLoader({ isLoading: false, info: '' });
        return;
      }
      setLoader(prevState => ({ ...prevState, info: status }));
      // Simulate waiting time for Strava to process the activity
      await new Promise(res => setTimeout(res, 5000));
      // validation handling
      const validation = await validateActivity(id);
      const { status: validationStatus, error: validationError, activity_id } = validation.data;

      if (validationError) {
        const errorMessage = validationError.includes('duplicate')
            ? 'This activity appears to be a duplicate and cannot be uploaded.'
            : DEFAULT_ERROR
        setError(errorMessage);
      }

      if (validationStatus === 'Your activity is ready.') {
        setSuccessLink(`https://www.strava.com/activities/${activity_id}`);
        setFiles({file1: null, file2: null});
      }
    } catch (err: any) {
      setError(err.message || DEFAULT_ERROR);
    } finally {
      setLoader({ isLoading: false, info: '' });
    }
  }

  return (
    <div className="h-full lg:h-auto flex flex-col p-5 lg:p-10 mt-10 relative">
      <form
          onSubmit={handleSubmit}
          className="flex flex-col"
      >
        <input type="text" name="data_type" defaultValue="gpx" hidden/>
        <div className="flex justify-between py-2">
          <label className="py-1.5 pr-3 w-1/2" htmlFor="name">Title</label>
          <input
              className="w-1/2 border-2 border-dashed border-lime-900"
              required
              type="text"
              name="name"
              placeholder="name your activity"
          />
        </div>
        <div className="flex justify-between py-2">
          <label className="py-1.5 pr-3 w-1/2" htmlFor="description">Description</label>
          <input
              className="w-1/2 border-2 border-dashed border-lime-900"
              required
              type="text"
              name="description"
              placeholder="describe your activity"
          />
        </div>
        <FileUpload
            labelText='Upload 1st activity file (.gpx)'
            dropId='file1'
            uploadId='upload1'
            handleChange={handleChange}
            handleDrop={handleDrop}
            file={files.file1}
        />
        <FileUpload
            labelText='Upload 2nd activity file (.gpx)'
            dropId='file2'
            uploadId='upload2'
            handleChange={handleChange}
            handleDrop={handleDrop}
            file={files.file2}
        />
        <button
            className="lowercase text-lime-900 border-lime-900 border-4 p-2 mb-2 font-bold transition-colors delay-150 hover:bg-amber-100"
            type="submit"
        >
          Upload
        </button>
      </form>
      {successLink !== '' &&
          <div className="mt-20 p-10 bg-amber-200">
            <h2>Your activity is successfully posted!</h2>
            <div>You can check it out on Strava now. Here is a <a href={successLink} target="_blank" rel="noreferrer"><strong>LINK</strong></a> to your activity.</div>
          </div>
      }
      <Loader isLoading={loader.isLoading} info={loader.info} />
      <span className="w-full font-bold text-red-500 text-center absolute left-1/2 transform -translate-x-1/2 bottom-3">
        { error }
      </span>
    </div>
  );
}