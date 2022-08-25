



import { firestore } from "../../../../../../utils/firebase";
import NextCors from 'nextjs-cors';
import axios from "axios";


async function make_request(ops){
    try{
        const res = await axios.post(ops.ip, {
            command: ops.command,
          });
        if(res.status != 200) return false;
        return true;
    }
    catch{
        return false;
    }
}

export default async function handler(req, res) {

    console.log("fetching all users using the application");
    const docSnapshots = await firestore.collection("Users").get();
    const docs = docSnapshots.docs.map((doc) => doc.data());
    console.log("helloooo");
    const appName = req.query.appName.toString();
    const version = req.query.version.toString();
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     // command to delete : 'Get-Package -Provider Programs -IncludeWindowsInstaller -Name "VLC media player" |  % { & ($_.Meta.Attributes["UninstallString"] -replace \'"\') /S}'
    // console.log(docs[0].id); 
    var functions = [];
    for(var i=0; i<docs.length; i++){
        for(var j=0;j<docs[i].installed_apps.length; j++){
            console.log(docs[i].installed_apps[j].name);
            if( appName.toLowerCase() == docs[i].installed_apps[j].name.toLowerCase()){
                const command = `Get-Package -Provider Programs -IncludeWindowsInstaller -Name "${docs[i].installed_apps[j].name}" |  % { & ($_.Meta.Attributes["UninstallString"] -replace \'"\') /S}`;
                var operation = {
                    ip :  "http://" + docs[i].ipv4 + ":8080",
                    command : command
                };
                functions.push(operation);
            }
        }
    }

    for(var i=0; i<functions.length; i++){
        if(!await make_request(functions[i])){
            res.status(400);
        }
    }

    res.status(200).json({"version":version,"app":appName});
}

