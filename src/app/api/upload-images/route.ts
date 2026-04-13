import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        // 1. Verify Authentication
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized. Please login.' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token) as { userId: string, role: string } | null;

        if (!decoded || decoded.role !== 'dealer') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Only dealers can upload images.' }, { status: 403 });
        }

        // 2. Parse FormData
        const formData = await req.formData();
        const imageFiles = formData.getAll('images') as File[];
        const imageUrls: string[] = [];

        if (!imageFiles || imageFiles.length === 0) {
            return NextResponse.json({ success: false, message: 'No images provided.' }, { status: 400 });
        }

        for (const file of imageFiles) {
            if (file.size > 0 && file.name) {
                const buffer = Buffer.from(await file.arrayBuffer());

                const result = await new Promise<any>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: 'kingdavidcar_cars' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });

                imageUrls.push(result.secure_url);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Images uploaded successfully',
            urls: imageUrls
        }, { status: 201 });

    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error during upload.' },
            { status: 500 }
        );
    }
}
