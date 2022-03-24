
import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';


export default async function handler(req, res) {
    // console.log((req.body.name));
    const req_app = req.body.name;
    // const req_app = "VLC Media Player";
    const docSnapshots = await firestore.collection("authorized_apps").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());
    // get the value of key from map
    const data = docs.find(doc => doc.name === req_app);
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    if (data) {
        res.status(200).json({ data })
    }
    else {
        res.status(404).json({ message: "Not found" })
    }
}
