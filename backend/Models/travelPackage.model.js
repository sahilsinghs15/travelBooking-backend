import { Schema, model } from "mongoose";

const travelPackageSchema = new Schema({
    
    title: {
        type: String,
        required: [true, 'Package title is required'],
        trim: true,
    },
    image_url: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    destination: {
        type: String,
        required: [true, 'Destination is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    duration: {
        type: String, 
        required: [true, 'Duration is required'],
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    end_date: {
        type: Date,
        required: [true, 'End date is required'],
    },
    itinerary: [
        {
            day: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ],
    inclusions: {
        type: [String], // Array of strings
        required: [true, 'Inclusions are required'],
    },
    exclusions: {
        type: [String], // Array of strings
        required: [true, 'Exclusions are required'],
    }
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt
});

const TravelPackage = model("TravelPackage", travelPackageSchema);

export default TravelPackage;
