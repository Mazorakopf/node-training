import { pipeline } from 'stream';
import { promises, createReadStream, createWriteStream } from 'fs';
import csvtojson from 'csvtojson';

promises.mkdir('./result', { recursive: true })
  .then(() => convertCsvToJson())
  .catch(error => console.error('Error while making dir', error));


function convertCsvToJson(csvPath = './csv/task2.csv', jsonPath = './result/task2.txt') {
  // First option
  pipeline(
    createReadStream(csvPath),
    csvtojson(),
    createWriteStream(jsonPath),
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
  //   .pipe(createWriteStream(jsonPath))
  //   .on('error', error => console.error('Error while writing file.', error))
  //   .on('finish', () => console.error('Pipeline succeeded.')); 
}