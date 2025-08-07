import { Readable } from 'stream';

export function toNodeReadable(req) {
  const reader = req.body?.getReader();

  if (!reader) {
    throw new Error('El request body no es un ReadableStream');
  }

  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) return this.push(null);
      this.push(Buffer.from(value));
    },
  });
}
