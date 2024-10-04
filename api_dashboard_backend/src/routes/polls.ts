import { Request, Response, NextFunction } from "express";
import { polls, stopPolls } from '../healthChecks/apiHealthSchedular'

import { Router } from "express";

const router = Router();

router.post('/:id', async (req:Request, res:Response, next:NextFunction) => {
    const collectionId = req.params.id;
    try{
          const schedule = await polls(collectionId);
          res.send(`polling is successful for your collectionId ${collectionId}`)
    }catch(error){
        next(error)
    }
  
})


router.post('/stop/:id', async (req: Request, res: Response, next: NextFunction) => {
  const collectionId = req.params.id
  try {
    const schedule = await stopPolls(collectionId)
    res.send(`polling is stopped for your collectionId ${collectionId}`)
  } catch (error) {
    next(error)
  }
})

export default router