export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId) || propertyId <= 0) {
    return NextResponse.json({ message: 'Propiedad inválida' }, { status: 400 });
  }

  const property = await prisma.property.findUnique({
    where: { idProperty: propertyId },
  });

  if (!property) {
    return NextResponse.json({ message: 'Propiedad no encontrada' }, { status: 404 });
  }


  try {
    const formData = await request.formData();
    const fileField = formData.get('file');

    if (!fileField) {
      return NextResponse.json({ message: 'No se encontró archivo (campo "file" vacío)' }, { status: 400 });
    }

    let buffer: Buffer | null = null;
    let filename = `property_${propertyId}_${Date.now()}.jpg`;
    let contentType = 'application/octet-stream';

    // Caso 1: fileField es File/Blob y tiene arrayBuffer()
    try {
      if ((fileField as any).arrayBuffer && typeof (fileField as any).arrayBuffer === 'function') {
        const ab = await (fileField as any).arrayBuffer();
        buffer = Buffer.from(ab);
        if ((fileField as any).name) filename = (fileField as any).name;
        if ((fileField as any).type) contentType = (fileField as any).type;
      }
    } catch (e) {
      // no hacemos nada aquí, vamos a intentar otras estrategias
      // console.warn('arrayBuffer intento fallido:', e);
    }

    // Caso 2: fileField es un stream (por ejemplo node formdata)
    if (!buffer && (fileField as any).stream && typeof (fileField as any).stream === 'function') {
      const stream = (fileField as any).stream();
      buffer = await streamToBuffer(stream);
      if ((fileField as any).name) filename = (fileField as any).name;
      if ((fileField as any).type) contentType = (fileField as any).type;
    }

    // Caso 3: fileField es un ReadableStream (web streams)
    if (!buffer && (fileField as any).getReader && typeof (fileField as any).getReader === 'function') {
      // web ReadableStream -> convertir a buffer
      const reader = (fileField as any).getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      const total = chunks.reduce((sum, c) => sum + c.length, 0);
      const buf = Buffer.alloc(total);
      let offset = 0;
      for (const c of chunks) {
        buf.set(c, offset);
        offset += c.length;
      }
      buffer = buf;
    }

    // Caso 4: fileField es un string (podría ser base64 data URL o una URL)
    if (!buffer && typeof fileField === 'string') {
      const maybe = fileField as string;
      // base64 data URL?
      const m = maybe.match(/^data:(.+);base64,(.*)$/);
      if (m) {
        contentType = m[1];
        const base64 = m[2];
        buffer = Buffer.from(base64, 'base64');
      } else if (maybe.startsWith('http')) {
        // si es una URL remota, podés re-descargarla y subirla a cloudinary
        const resp = await fetch(maybe);
        if (!resp.ok) {
          return NextResponse.json({ message: 'No se pudo descargar la URL proporcionada' }, { status: 400 });
        }
        const ab = await resp.arrayBuffer();
        buffer = Buffer.from(ab);
        const ct = resp.headers.get('content-type');
        if (ct) contentType = ct;
      } else {
        // string no reconocida
        return NextResponse.json({ message: 'Formato de archivo no soportado (string no base64 ni url)' }, { status: 400 });
      }
    }

    if (!buffer) {
      return NextResponse.json({ message: 'No se pudo procesar el archivo enviado' }, { status: 400 });
    }

    // Subimos el buffer a Cloudinary mediante upload_stream
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'propiedades',
          public_id: `property_${propertyId}_${Date.now()}`,
          resource_type: 'image'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const cloudinaryResult = uploaded as any;

    // Guardamos la URL en la DB
    const newImage = await prisma.image.create({
      data: {
        url: cloudinaryResult.secure_url,
        idProperty: propertyId,
      },
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json({ message: 'Error al subir imagen', detail: String(error) }, { status: 500 });
  }
}
