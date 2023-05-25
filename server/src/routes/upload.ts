import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify/types/instance";
import { extname, resolve } from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5242880, //5mb
      },
    });

    if (!upload) {
      return reply.code(400).send();
    }

    const mimetypeRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimetypeRegex.test(upload.mimetype);

    if (!isValidFileFormat) {
      return reply.code(400).send();
    }

    const field = randomUUID();
    const extension = extname(upload.filename);

    const fileName = field.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads", fileName)
    );

    await pump(upload.file, writeStream);

    const fullUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    return reply.code(200).send({ url: fileUrl });
  });
}
