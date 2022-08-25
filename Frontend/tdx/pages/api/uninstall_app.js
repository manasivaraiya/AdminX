
import NextCors from 'nextjs-cors';


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

    // todo: response
    res.status(200).json({})
}
