import {
  createNewRtu,
  getAllRtus,
  isExistRtu,
  deleteOneRtuById,
  getOneRtuById,
  updateRtuByMacAddress,
  deleteAllRtus,
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


    const resultObj = rtus.map(result => {
      const {macAddress, rssi, location, _id} = result;
      return {macAddress, rssi, location, _id}
    })
    console.log('resultObj', resultObj);
    
    res.status(200).send(resultObj)
    //res.status(200).send(rtus);

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


// allow to update only rssi
const allowUpdateParamers = ['rssi']

export const updateRtuParameters = async (req, res) => {
  try {
    const {id} = req.params;
    //const {macAddress} = req.body;

    const objectKeys = Object.keys(req.body)
    const isEveryContainParams = allowUpdateParamers.every((item) => {
      return objectKeys.includes(item)
    })

    if(!isEveryContainParams) {
      res.status(202).send({message: "rssi is not exist"})
    }

    // create object to only update allow parameter
    const updateThisObj = {}
    allowUpdateParamers.forEach((elem) => {
      if(objectKeys.includes(elem)) {
        updateThisObj[elem] = req.body[elem]
      }
    });
    // console.log('updateObj', updateThisObj);
    
    const updated = await updateRtuByMacAddress(id, updateThisObj);
    res.status(200).send(updated);

  } catch( err) {
    res.status(500).send(err)
  }
}


export const deleteAllRtusController = async (req, res) => {
  try {

    const resDeleted = await deleteAllRtus();

    if( resDeleted.acknowledged) {
      console.log('success delete all rtus');
    }

    res.status(200).send("success");

  } catch(err) {
    res.status(500).send(err)
  }
}