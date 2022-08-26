import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';



export default async function handler(req, res) {


    // get time series incidents
    // required param - uuid

    console.log((req.body));

    const docSnapshots = await firestore.collection("Users").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());

    // 7 days epoch ms: 604800000
    // 1 day epoch ms:  86400000

    var now = Date.now();
    // get the value of key from map
    var resp = [0, 0, 0, 0, 0, 0, 0]
    docs.forEach((doc) => {
        doc.incidents.forEach((incident) => {
            if ((now - incident.epoch) <= 604800000) {
                resp[Math.floor((now - incident.epoch) / 86400000)]++;
            }
        })

    });

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {

        res.status(200).json({ response: resp })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error", Error: e });
    }

}

