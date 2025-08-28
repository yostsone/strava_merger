/**
 * Merges two GPX files into one by combining their <trkseg> elements.
 * @param file1
 * @param file2
 * @param outputName
 */
export async function mergeGpxFiles(
    file1: File,
    file2: File,
    outputName = 'merged.gpx'
): Promise<File> {
  // Helper to read File as text
  const readFile = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
      });

  // Read both files
  const [gpx1, gpx2] = await Promise.all([readFile(file1), readFile(file2)]);

  // Parse both GPX files
  const parser = new DOMParser();
  const doc1 = parser.parseFromString(gpx1, 'application/xml');
  const doc2 = parser.parseFromString(gpx2, 'application/xml');

  // Get all <trkseg> from both files
  const trksegs1 = Array.from(doc1.querySelectorAll('trkseg'));
  const trksegs2 = Array.from(doc2.querySelectorAll('trkseg'));

  // Get <gpx> and <trk> from file1
  const gpxElem = doc1.querySelector('gpx');
  const trkElem = doc1.querySelector('trk');

  if (!gpxElem || !trkElem) throw new Error('Invalid GPX structure in file 1');

  // Remove existing <trkseg> from file1 <trk>
  trkElem.querySelectorAll('trkseg').forEach(trkseg => trkseg.remove());

  // Append all <trkseg> from both files
  [...trksegs1, ...trksegs2].forEach(trkseg => {
    trkElem.appendChild(trkseg.cloneNode(true));
  });

  const newTimestamp = doc1.querySelector('trkpt > time');
  if (!newTimestamp) {
    throw new Error('No timestamp found in trkpt');
  } else {
    const timeStampText = newTimestamp.textContent || '';
    newTimestamp.textContent = increaseIsoTimestamp(timeStampText, 5);
  }

  // Serialize XML back to string
  const serializer = new XMLSerializer();
  const mergedGpxString = serializer.serializeToString(doc1);

  // Return as File
  return new File([mergedGpxString], outputName, { type: 'application/gpx+xml' });
}

/**
 * Function to increase ISO by given minutes so Strava allows upload and doesn't complain about duplicate timestamps
 * @param isoString
 * @param minutesToAdd
 */
function increaseIsoTimestamp(isoString: string, minutesToAdd: number):string {
  let result = '';
  try {
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date.toISOString();
  } catch (e) {
    console.log(e);
  }

  return result;
}