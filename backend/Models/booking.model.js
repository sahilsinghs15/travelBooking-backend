import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    travelPackage: {
        type: Schema.Types.ObjectId, 
        ref: 'TravelPackage', 
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now, 
    },
    travelDate: {
        type: Date,
        required: [true, 'Please select a travel date'],
    },
    travelerDetails: [
        {
            name: {
                type: String,
                required: [true, 'Traveler name is required'],
            },
            age: {
                type: Number,
                required: [true, 'Traveler age is required'],
                min: [0, 'Age must be a positive number'],
            },
            gender: {
                type: String,
                enum: ['male', 'female', 'other'], 
                required: [true, 'Please select gender'],
            }
        }
    ],
    totalTravelers: {
        type: Number,
        required: [true, 'Please specify the number of travelers'],
        min: [1, 'There must be at least one traveler'],
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true, 
});

const Booking = model('Booking', bookingSchema);

export default Booking;
