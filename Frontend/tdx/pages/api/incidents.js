import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';



export default async function handler(req, res) {

    // Required parameters
    // - uuid
    // - epoch
    // - app_name

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
    console.log (req)
    if (document) {

        // Update details
        try {
            console.log ("Update")
            
            var ul = document.incidents;
            var obj = {
                epoch: Date.now(),
                name: req.body.file
            }
            ul.push(obj)
            const data2 = {
                reported_incidents: document.reported_incidents + 1,
                incidents: ul
            };

            await firestore.collection("Users").doc(document.id).update(data2);
            res.status(200).json({ message: "Incident successfully reported" })

        } catch (e) {
                console.error(e);
                res.status(500).json({message: "Server error", Error: e});
        }

    } else {
        res.status(404).json({message: "Resource (User) doesn't exist on database"});
    }
}
