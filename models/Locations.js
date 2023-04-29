import mongoose from "mongoose";

const LocationsSchema = new mongoose.Schema({ 
    latitude: {
        type: Number,  // old String
        default: ""
    },
    longitude: {
        type: Number, // old String
        default: ""
    },
})

export const LocationsModel = mongoose.model("Locations", LocationsSchema);