import { firestore } from "../../utils/firebase";
import NextCors from 'nextjs-cors';


const nodemailer = require('nodemailer');

async function sendEmail (emailid, message) {


    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'not.your.regular.mail.id@gmail.com',
        pass: 'faulmywfudhegexz'
    }
    });

    var mailOptions = {
    from: 'not.your.regular.mail.id@gmail.com',
    to: emailid,
    subject: 'Alert from AdminX',
    text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

    // not.your.regular.mail.id@gmail.com
    // notyourregularmail
}

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
            if (req.body.email) {
                sendEmail (req.body.email, req.body.message);
            } else {
                sendEmail ("therajtiwari254@gmail.com", `Dear Admin user with userId: ${req.body.uuid}, has tried to install "${req.body.file}" file in your network`);
            }
            res.status(200).json({ message: "Incident successfully reported" })

        } catch (e) {
                console.error(e);
                res.status(500).json({message: "Server error", Error: e});
        }

    } else {
        res.status(404).json({message: "Resource (User) doesn't exist on database"});
    }
}

