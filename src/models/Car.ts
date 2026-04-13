import mongoose, { Schema, Document } from 'mongoose';

export interface ICar {
    dealerId: mongoose.Types.ObjectId;
    make: string;
    model: string;
    year: number;
    mileage: number;
    vin: string;
    color: string;
    transmission: string;
    fuelType: string;
    engineSize: string;
    price: number;
    location: string;
    description: string;
    features: string[];
    images: string[];
    status: 'available' | 'sold';
    createdAt: Date;
    updatedAt: Date;
}

const CarSchema = new Schema<ICar>({
    dealerId: {
        type: Schema.Types.ObjectId,
        ref: 'Dealer',
        required: true,
    },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    vin: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    engineSize: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available',
    },
}, {
    timestamps: true,
});

const Car = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;
