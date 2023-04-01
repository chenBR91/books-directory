import axios from 'axios'
import IP from 'ip'
import dotenv from "dotenv";

dotenv.config();
const {IP_GEOLOCATION_API} = process.env

export const getIpAdressController = (req, res) => {
    try {
        const ipAddress = IP.address()

        res.status(200).send(ipAddress)
    }

    catch(err) {
        res.status(500).send(err)
    }
}


export const getLocationByAddressController = async (req, res) => {
    try {
        const location = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${IP_GEOLOCATION_API}`)
        
        res.status(200).send(location['data'])
    }
    catch(err) {
        res.status(500).send(err)
    }
}





// javascript get geolocation

// const successCallback = (position) => {
//     console.log(position);
//   };
  
//   const errorCallback = (error) => {
//     console.log(error);
//   };

//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);