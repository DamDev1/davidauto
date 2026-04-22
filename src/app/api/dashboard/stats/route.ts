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

        const dealerId = decoded.userId;

        // 2. Aggregate Statistics
        const cars = await Car.find({ dealerId });

        const stats = {
            activeListings: cars.filter(car => car.status === 'available').length,
            totalViews: cars.reduce((acc, car) => acc + (car.views || 0), 0),
        };

        return NextResponse.json({
            success: true,
            stats
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
