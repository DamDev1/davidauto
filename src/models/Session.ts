import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    userModel: 'Producer' | 'User' | 'Actor';
    refreshToken: string;
    expiresAt: Date;
    createdAt: Date;
}

const SessionSchema = new Schema<ISession>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userModel'
    },
    userModel: {
        type: String,
        required: true,
        enum: ['Producer', 'User', 'Actor']
    },
    refreshToken: {
        type: String,
        required: true,
        index: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// Auto-delete expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export default Session;
