import {
  createNewRtu,
  getAllRtus,
  isExistRtu,
  deleteOneRtuById,
  getOneRtuById,
} from "../services/Rtus.js";

import { deleteOneLocation } from "../services/Locations.js";

export const createNewRtuController = async (req, res) => {
  try {
    const obj = req.body;
    console.log("obj", obj);

    const existRtu = await isExistRtu(obj.macAddress);
    if (existRtu.length !== 0) {
      res.status(200).send("MacAddress alredy exist");
    } else {
      const newRtu = await createNewRtu(obj);
      res.status(200).send(newRtu);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAllRtusController = async (req, res) => {
  try {
    const rtus = await getAllRtus();
    res.status(200).send(rtus);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteOneRtuByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const findRtuById = await getOneRtuById(id);
    const locationId = findRtuById[0]['location'].valueOf() // return the value of new objectID('value')
    
    const rtuDeleted = await deleteOneRtuById(id);

    // if rtu id is exist delete rtu and location of rtu
    if (rtuDeleted.acknowledged) {
        await deleteOneLocation(locationId)
    }

    res.status(200).send(rtuDeleted);

  } catch (err) {
    res.status(400).send(err);
  }
};
