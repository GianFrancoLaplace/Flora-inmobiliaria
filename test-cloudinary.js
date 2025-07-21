// test-cloudinary.js
import { readFile } from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import cloudinary from './src/lib/cloudinary.js';

dotenv.config();

const testUpload = async () => {
    try {
        const filePath = path.resolve('./public/backgrounds/homeBackground.jpg');
        const fileBuffer = await readFile(filePath);

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'pruebas',
                    resource_type: 'image',
                    public_id: `test-${Date.now()}`,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(fileBuffer);
        });

        console.log('✅ Subida exitosa:', uploadResult.secure_url);
    } catch (error) {
        console.error('❌ Error al subir a Cloudinary:', error);
    }
};

testUpload();
