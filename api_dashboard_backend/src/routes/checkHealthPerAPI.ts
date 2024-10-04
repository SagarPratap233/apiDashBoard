import { Request, Response, NextFunction, Router } from "express";
import AppError from "../middleware/appError";
import { apiHealthCheckPerCollection } from "../healthChecks/apiHealthCheck";

const router = Router();


router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params;

    try{
        const result = await apiHealthCheckPerCollection(id);
        // console.log(result)
        if (!result) {
          next(new AppError('Collection of APIs not found', 404))
        } else {
          res.status(200).json(result)
        }
        
    } 
    catch(error){
        next(error)
    }
})

export default router