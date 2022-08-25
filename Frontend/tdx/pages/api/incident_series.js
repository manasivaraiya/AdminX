import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';



export default async function handler(req, res) {


    // get time series incidents
    // required param - uuid

    console.log((req.body));

    const docSnapshots = await firestore.collection("Users").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());

    // get the value of key from map
    var document = docs.find(doc => doc.id == req.body.uuid);

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    console.log ("doc: ", document)
    if (document) {

        // get details

        try {
        
        res.status(200).json({ response: document.incidents })

        } catch (e) {
                console.error(e);
                res.status(500).json({message: "Server error", Error: e});
        }

    } else {
        res.status(404).json({message: "Resource not found!"});
    }

}

