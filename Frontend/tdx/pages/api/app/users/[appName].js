



import { firestore } from "../../../../utils/firebase";
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

    console.log("fetching all users using the application");
    const docSnapshots = await firestore.collection("Users").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());
    const appName = req.query.appName.toString();
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    // console.log(docs[0].id); 
    var output = [];
    for(var i=0; i<docs.length; i++){
        for(var j=0;j<docs[i].installed_apps.length; j++){
            if( appName.toLowerCase() == docs[i].installed_apps[j].name.toLowerCase()){
                output.push(docs[i].ipv4);
            }
        }
    }
    res.status(200).json(output);
}

