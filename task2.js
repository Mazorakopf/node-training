import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import csvtojson from 'csvtojson';

const csvPath = './csv/task2.csv';
const resPath = './result/task2.txt';

// First option
pipeline(
  createReadStream(csvPath),
  csvtojson(),
  createWriteStream(resPath),
  (err) => {
    if (err) { console.error('Pipeline failed.', err); } 
    else { console.log('Pipeline succeeded.'); }
  }
);

// Second option
// createReadStream(csvPath)
//   .on('error', error => console.error('Error while reading file.', error))
//   .pipe(csvtojson())
//   .on('error', error => console.error('Error while converting file.', error))
//   .pipe(createWriteStream(resPath))
//   .on('error', error => console.error('Error while writing file.', error))
//   .on('finish', () => console.error('Pipeline succeeded.'));