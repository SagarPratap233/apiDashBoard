import { Request, Response, NextFunction, Router } from "express";
import {collection}  from "../models/apiCollection";
import AppError from "../middleware/appError";
import { checkAPIHealth } from "../healthChecks/apiHealthCheck";
import { CurlCommand } from "../models/curlCommand";

interface api {
  _id: string
  url: string
  body: object | null
  headers: object
  method: string
  __v: number
}
const router = Router();

router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params;

    try{
        const APIs = await collection.findById(id).populate('apis')
        // console.log(APIs);
        if (!APIs) {
          next(new AppError('Collection of APIs not found', 404))
        }else{
        const healthCheckResults = await Promise.all(
          APIs.apis.map(async (apiId) => {
            const apiRecord: api | null = await CurlCommand.findById(apiId)

            if (apiRecord) {
              // Assuming `checkAPIHealth` is a function that takes the API and returns a health check result
              return checkAPIHealth(apiRecord)
            }

            return null // Handle the case where the API was not found
          })
        )
        res.status(200).json(healthCheckResults)
        }
        
    } 
    catch(error){
        next(error)
    }
})

export default router