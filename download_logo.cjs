const https = require('https');
const fs = require('fs');

const url = 'https://drive.google.com/uc?export=download&id=1QDTxG7GGzBjqd-IOQtUwri3KZOkfZ2VL';

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, (res2) => {
      res2.pipe(fs.createWriteStream('public/logo.png'));
    });
  } else {
    res.pipe(fs.createWriteStream('public/logo.png'));
  }
});
