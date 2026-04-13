import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Car from '@/models/Car';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // 1. Verify Authentication
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized. Please login.' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token) as { userId: string, role: string } | null;

        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Invalid token. Please login again.' }, { status: 401 });
        }

        // 2. Fetch User's Cars
        const cars = await Car.find({ dealerId: decoded.userId }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: cars.length,
            cars
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching user cars:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
