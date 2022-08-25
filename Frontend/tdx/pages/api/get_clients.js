import find from 'local-devices'

export default async function handler(req, res) {
    var _ = require('underscore');
    find().then(devices => {
        if (devices.length > 0) {
            res.status(200).json({ devices })
        }
        else {
            res.status(404).json({ message: "Not found" })
        }
    })
}