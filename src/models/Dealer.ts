import mongoose, { Schema, Document } from 'mongoose';

export interface IDealer extends Document {
    fullName: string;
    email: string;
    password?: string;
    phone?: string;
    dealershipName?: string;
    location?: string;
    logoUrl?: string;
    role: 'dealer';
    status: 'pending' | 'approved' | 'rejected';
    whatsapp?: string;
    otp?: string;
    otpExpiresAt?: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const DealerSchema = new Schema<IDealer>({
    fullName: {
        type: String,
        required: [true, 'Please provide a full name'],
        maxlength: [80, 'Name cannot be more than 80 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
    },
    dealershipName: {
        type: String,
    },
    location: {
        type: String,
    },
    logoUrl: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['dealer'],
        default: 'dealer',
    },
    whatsapp: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    otp: {
        type: String,
        select: false,
    },
    otpExpiresAt: {
        type: Date,
        select: false,
    },
}, {
    timestamps: true,
});

const Dealer = mongoose.models.Dealer || mongoose.model<IDealer>('Dealer', DealerSchema);

export default Dealer;
