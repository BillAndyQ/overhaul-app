// src/lib/parseFormData.js
import formidable from 'formidable';
import { Readable } from 'stream';

export async function parseFormData(req) {
  const contentType = req.headers.get('content-type') || '';
  const contentLength = req.headers.get('content-length') || null;
  const body = await req.arrayBuffer();
  const stream = Readable.from(Buffer.from(body));

  const fakeReq = Object.assign(stream, {
    headers: {
      'content-type': contentType,
      'content-length': contentLength,
    },
    method: 'POST',
    url: '',
  });

  const form = formidable({
    uploadDir: './public/uploads',
    keepExtensions: true,
    multiples: true,
  });

  return await new Promise((resolve, reject) => {
    form.parse(fakeReq, (err, fields, files) => {
      if (err) return reject(err);
      const data = {};

      // Combina fields y files en un solo objeto
      for (const key in fields) data[key] = fields[key][0];
      for (const key in files) data[key] = files[key][0]; // si multiples: true y solo quieres uno
      resolve(data);
    });
  });
}
