import { RtusModel } from "../models/Rtus.js";

export const createNewRtu = (obj) => {
  const createRtu = new RtusModel(obj);
  createRtu.save();
  return createRtu;
};

export const getOneRtuById = (id) => {
    return RtusModel.find({_id: id})
}

export const getAllRtus = () => {
  return RtusModel.find({}).populate("location").exec();
};

export const isExistRtu = (macAddress) => {
    return RtusModel.find({macAddress: macAddress})
}

export const deleteOneRtuById = (id) => {
    return RtusModel.deleteOne({_id: id})
}

export const updateRtuByMacAddress = (id, obj) => {
  return RtusModel.updateOne({_id: id}, { $set: obj })
}
