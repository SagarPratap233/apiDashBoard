import { Router, Request, Response, NextFunction } from "express";
import {collection} from "../models/apiCollection";
import axios from "axios";

const router = Router();


//fetch all the collections
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const Collections = await collection.find();
        res.status(200).json(Collections)
    } catch(error){
        next(error);
    }
})

router.post(('/'),async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const { name, apis } = req.body

        const Collections = new collection({
          name,
          apis,
        })
        
        await Collections.save();
        res.status(200).json({
            "message": "collection is saved"
        })
    } catch(error)
    {
        next(   error);
    }
})


export default router