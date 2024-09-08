import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Link to User model
        ref: 'User', // Reference to User collection
        required: true,
    },
    travelPackage: {
        type: Schema.Types.ObjectId, // Link to TravelPackage model
        ref: 'TravelPackage', // Reference to TravelPackage collection
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now, // Automatically store the date when the booking was created
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
                enum: ['male', 'female', 'other'], // Optional, to restrict gender options
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
        enum: ['pending', 'confirmed', 'cancelled'], // Booking status
        default: 'pending',
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Booking = model('Booking', bookingSchema);

export default Booking;
