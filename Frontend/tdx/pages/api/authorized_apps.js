
import { firestore } from "../../utils/firebase";

export default async function handler(req, res) {
    console.log("here");
    console.log((req.body));
    const req_app = req.body.name;
    // const req_app = "VLC Media Player";

    const docSnapshots = await firestore.collection("authorized_apps").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());
    // get the value of key from map
    const data = docs.find(doc => doc.name === req_app);

    if (data) {
        res.status(200).json({ data })
    }
    else {
        res.status(404).json({ message: "Not found" })
    }
}
