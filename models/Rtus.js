import mongoose from "mongoose";

const RtusSchema = new mongoose.Schema({
    macAddress: {
        type: String,
        unique: true,
        require: true,
        default: "",
    },
    rssi: {
        type: Number,
        default: 0,
    },
    location: {type: mongoose.Schema.Types.ObjectId, ref: "Locations"}
})

export const RtusModel = mongoose.model("Rtus", RtusSchema)