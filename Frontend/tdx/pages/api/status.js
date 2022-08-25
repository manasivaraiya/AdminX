import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';



export default async function handler(req, res) {

    console.log("called status");
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

        // Update details
        try {
            console.log ("Update")

            const now = Date.now()
            var status_rn = "Online"
            if ((req.body.epoch - document.epoch) > 1000000) {
                status_rn = "Offline"
            }
            const data = {
                hostname: req.body.hostname,
                id: req.body.uuid,
                ipv4: req.body.ipv4,
                status: status_rn,
                epoch: req.body.epoch
            };

            await firestore.collection("Users").doc(document.id).update(data);
            res.status(200).json({ message: "Entry updated successfully" })

        } catch (e) {
                console.error(e);
                res.status(500).json({message: "Server error", Error: e});
        }

    }
    else {

        // Add new
        console.log("add new entry");
        try {
            const data = {
              hostname: req.body.hostname,
              id: req.body.uuid,
              ipv4: req.body.ipv4,
              status: "Online",
              epoch: req.body.epoch,
              reported_incidents: 0,
              incidents: [
                {
                    name: "test",
                    epoch: 9392,
                }
              ],
              installed_apps: [
                {
                    name: "test",
                    version: "0.1"
                }
              ],
              uninstall_list: [
                'test'
              ]
            };
      
            await firestore.collection("Users").doc(req.body.uuid).set(data);
            res.status(200).json({ message: "Entry added successfully" })
            
          } catch (e) {
                console.error(e);
                res.status(500).json({message: "Server error", Error: e});
          }
        
    }
}

