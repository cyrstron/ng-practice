'use strict';

const Koa = require('koa');
const https = require('https');
const fs = require('fs');

const app = new Koa();
const PORT = process.env.PORT || 3000;
const contentTypes = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png'
}
// response

app.use(async ctx => {
  const url = ctx.request.url;

  if (url.indexOf('.') !== -1) {
    const fileData = new Promise((res, rej) => {
      fs.readFile('./dist' + url, async (err, data) => {
        if (err) {
          rej(err);
        }
        res(data);
      });
    });

    const data = await fileData;

    const typeIndex = url.lastIndexOf('.');
    const fileType = url.slice(typeIndex);

    ctx.set('Content-Type', contentTypes[typeIndex]);
    ctx.body = data;

  } else {

    const fileData = new Promise((res, rej) => {
      fs.readFile('./dist/index.html', async (err, data) => {
        if (err) {
          rej(err);
        }
        res(data);
      });
    });

    const data = await fileData;

    ctx.set('Content-Type', 'text/html');
    ctx.body = data;
  }

  console.log(ctx.request.url);

});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`);
});
