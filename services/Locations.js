import { LocationsModel } from "../models/Locations.js";

export const createNewLocation = (obj) => {
    const newLocation = new LocationsModel(obj)
    newLocation.save()
    return newLocation
}


export const getAllLocation = () => {
    return LocationsModel.find({})
}


export const deleteOneLocation = (id) => {
    return LocationsModel.findByIdAndDelete({_id: id}) 
}


export const deleteAllLocations = () => {
    return LocationsModel.deleteMany();
}