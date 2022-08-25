import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';
import find from 'local-devices'

export default async function handler(req, res) {
    var _ = require('underscore');
    var total_devices;
    find().then(devices => {
        if (devices.length > 0) {
            total_devices = devices.length
        }
        else {
            res.status(404).json({ message: "No devices found in wifi" })
        }
    })
    var registered_devices;
    const docSnapshots = await firestore.collection("Users").get();
    registered_devices = docSnapshots.length;
    res.status(200).json({ total_devices: total_devices, registered_devices: registered_devices })
}