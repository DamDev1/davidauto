import connectDB from '@/lib/db';
import Car from '@/models/Car';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const result = await Car.updateMany({ status: 'avaliable' }, { $set: { status: 'available' } });
        return NextResponse.json({
            success: true,
            message: 'Migration completed',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
