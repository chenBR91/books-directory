import { createNewLocation, getAllLocation, deleteOneLocation, deleteAllLocations } from "../services/Locations.js";

export const createNewLocationControoler = async (req, res) => {
  try {
    const newLocation = await createNewLocation(req.body);
    res.status(200).send(newLocation);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAllLocationsControoler = async (req, res) => {
  try {
    const allLocation = await getAllLocation();

    res.status(200).send(allLocation);
  } catch (err) {
    res.status(500).send(err);
  }
};


export const deleteOneLocationController = async (req, res) => {
  try {
    const { id } = req.params;
    
    const locationDetail = await deleteOneLocation(id)
    res.status(200).send(locationDetail);

  } catch (err) {
    res.status(500).send(err);
  }
};


export const deleteAllLocationsController = async (req, res) => {
    try {
        const deleteAll = await deleteAllLocations()
        res.status(200).send(deleteAll)

    } catch(err) {
        res.status(500).send(err)
    }
}