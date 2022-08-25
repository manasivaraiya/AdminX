
import find from 'local-devices'

export default async function handler(req, res) {
    console.log('LEARNING');
    var _ = require('underscore');
    var cidr = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.cidr || []), [])), []);
    var subnet = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.netmask || []), [])), []);
    console.log(cidr)
    console.log(subnet)
    find({ address: cidr[0] }).then(devices => {
        if (devices.length > 0) {
            res.status(200).json({ devices })
        }
        else {
            res.status(404).json({ message: "Not found" })
        }
    })


}