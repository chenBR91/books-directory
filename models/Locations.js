import mongoose from "mongoose";

const LocationsSchema = new mongoose.Schema({ 
    latitude: {
        type: String,
        default: ""
    },
    longitude: {
        type: String,
        default: ""
    },
})

export const LocationsModel = mongoose.model("Locations", LocationsSchema);