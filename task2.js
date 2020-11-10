import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import csvtojson from 'csvtojson';

var resPath = './result/task2.txt';

pipeline(
  createReadStream('./csv/task2.csv'),
  csvtojson(),
  createWriteStream(resPath),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
