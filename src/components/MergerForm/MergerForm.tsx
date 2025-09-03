import React, { useState, ChangeEvent } from 'react';
import { postActivity, validateActivity } from './MergerFormApi';
import { mergeGpxFiles } from '../../utils/MergeGpxFiles';
import Loader from "../Loader/Loader";

type Files = {
  file1: File | null,
  file2: File | null
}

/**
 * Handles drag events to prevent default behavior
 * @param e
 */
function handleDrag(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
}

export default function MergerForm() {
  const [files, setFiles] = useState<Files>({file1: null, file2: null});
  const [isLoading, setIsLoading] = useState(false);
  const [loaderInfo, setLoaderInfo] = useState('Loading...');
  const [error, setError] = useState('');
  const [successLink, setSuccessLink] = useState('');

  /**
   * Handles file drop event to update state with dropped file
   * @param e
   */
  function handleDrop(e: React.DragEvent<HTMLDivElement>){
    e.preventDefault();
    e.stopPropagation();
    const uploadId = e.currentTarget.id;

    if (uploadId && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [uploadId]: e.dataTransfer.files[0]
      }));
    }

    if (!uploadId) {
      setError('There was an error with the upload. Please try again.');
    }
  }

  /**
   * Handles file input change event to update state with selected file
   * @param e
   */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.currentTarget;

    if (files !== null && name && files.length > 0) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: files[0]
      }));
    }
  }

  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true);
      setLoaderInfo('Posting your activity to Strava...');
      if (!files.file1 || !files.file2) {
        setError('Both files are required!');
        return;
      }

      const gpxFile = await mergeGpxFiles(files.file1, files.file2);
      formData.append('file', gpxFile);
      postActivity( formData)
          .then(response => {
            const { id, status, error } = response.data;
            if (error) {
              setError(error);
              setIsLoading(false);
              return;
            }
            setLoaderInfo(status);
            new Promise(resolve => setTimeout(resolve, 5000))
                .then(()=> {
                  validateActivity(id)
                      .then(res => {
                        const { status, error, activity_id } = res.data;

                        if (error) {
                          if (error.includes('duplicate')) {
                            setError('This activity appears to be a duplicate and cannot be uploaded.');
                          } else {
                            setError('There was an error with your activity. Please try again.');
                          }
                          setIsLoading(false);
                        } else if (status === 'Your activity is ready.') {
                          setLoaderInfo('Your activity has been posted to Strava!');
                          setSuccessLink(`https://www.strava.com/activities/${activity_id}`);
                          setIsLoading(false);
                        }
                      })
                }
            );
          })
          .catch(error => {
            setError('There was an error posting your activity. Please try again.');
            setIsLoading(false);
          })
          .finally(() =>
              setFiles({file1: null, file2: null})
          );
    }
    catch(e) {
      setIsLoading(false);
      setError('There was an error processing your files. Please try again.');
    }
  }

  return (
    <div className="h-full lg:h-auto flex flex-col p-5 lg:p-10 mt-10 relative">
      <form
          action={handleSubmit}
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
        <div className="flex flex-col py-2">
          <h2>Upload 1st activity file (.gpx)</h2>
          <div
              className="border-2 border-dashed border-lime-900 bg-amber-50 text-center mb-10 mt-2"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              id="file1"
          >
            <input
                className="h-0 w-0 p-px absolute"
                name="file1"
                id="input1"
                type="file"
                onChange={handleChange}
                required
            />
            <label id="file1" htmlFor="input1" className="p-10 block cursor-pointer">
              {files.file1
                  ? files.file1.name
                  : 'Drag & drop files here or click to select'}
            </label>
          </div>
        </div>
        <div className="flex flex-col py-2">
          <h2>Upload 2nd activity file (.gpx)</h2>
          <div
              className="border-2 border-dashed border-lime-900 bg-amber-50 text-center mb-10 mt-2"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              id="file2"
          >
            <input
                className="h-0 w-0 p-px absolute"
                name="file2"
                id="input2"
                type="file"
                onChange={handleChange}
                required
            />
            <label id="file2" htmlFor="input2" className="p-10 block cursor-pointer">
              {files.file2
                  ? files.file2.name
                  : 'Drag & drop files here or click to select'}
            </label>
          </div>
        </div>
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
            <div>You can check it out on Strava now. Here is <a href={successLink} target="_blank"><strong>LINK</strong></a> to your activity.</div>
          </div>
      }
      <Loader isLoading={isLoading} info={loaderInfo} />
      <span className="w-full font-bold text-red-500 text-center absolute left-1/2 transform -translate-x-1/2 bottom-3">
        { error }
      </span>
    </div>
  );
}