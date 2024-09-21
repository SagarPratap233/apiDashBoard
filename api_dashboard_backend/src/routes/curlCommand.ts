import { Router, Request, Response } from "express";
import { CurlCommand } from "../models/curlCommand";

const router = Router();

router.post('/', async (req:Request, res:Response)=> {
    const {url, headers, body} = req.body;

    const curlCommand = new CurlCommand({
        url, 
        headers, 
        body
    });

    try{
        await curlCommand.save();
        res.status(201).json({message: 'cURL command saved successfull'});
    } catch(error){
        res.status(500).json({error: 'Error savong cURL command'});
    }

});


router.get('/', async (req: Request, res: Response)=> {
    try{
        const commands = await CurlCommand.find();
        res.status(200).json(commands);
    }
    catch (error){
        res.status(500).json({error: 'Error fetching cURL commands'});
    }
});

export default router