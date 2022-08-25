
import NextCors from 'nextjs-cors';
import { firestore } from "../../utils/firebase";



export default async function handler(req, res) {
    console.log("body is", (req.body));
    const req_app = req.body.name;

    // todo: socket 

   
    

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });

    try {

        var ul = document.uninstall_list;
        ul.push ({
            "name": req.body.name
        })


        data = {
            "uninstall_list": ul,
        }
    
        await firestore.collection("Users").doc(document.id).update(data);
        res.status(200).json({ message: "Entry updated successfully" })
        
    } catch (error) {
        res.status(500).json({ message: "Oops! Server Error" })
    }

    



    // todo: response
}
