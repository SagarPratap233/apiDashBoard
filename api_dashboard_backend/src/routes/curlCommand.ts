import { Router, Request, Response, NextFunction } from 'express'
import {Types} from 'mongoose'
import { CurlCommand } from '../models/curlCommand'
import {body, validationResult, ValidationError } from 'express-validator'
import {deleteAPIfromAllCollections} from '../service/utils/apiService'
import AppError from '../middleware/appError'

const router = Router()

interface Params {
  id: Types.ObjectId // Define the type for the route parameter
}

// Validation middleware
router.param('id', (req, res, next, id) => {
    if (!Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid ID format', 400));
    }
    next();
});

router.post('/', 
    [
        body('url').isURL().withMessage('Invalid URL'),
        body('headers').isObject().withMessage('Headers must be an object')

    ],
    async (req: Request, res: Response, next: NextFunction) => {

        const errorsFromValidation = validationResult(req);
        if(!errorsFromValidation.isEmpty()){
            const errorMessages =  errorsFromValidation.array().map(error=> error.msg);         
             return next(new AppError(errorMessages, 400))
        
    }
  const { url, headers, body, method} = req.body

  const curlCommand = new CurlCommand({
    url,
    headers,
    body,
    method
  })

  try {
    await curlCommand.save()
    res.status(201).json({ message: 'cURL command saved successfull' })
  } catch (error) {
    next(error)
}
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commands = await CurlCommand.find()
    res.status(200).json(commands)
  } catch (error) {
    next(error)
  }
})


router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiId = req.params.id;
    const api = await CurlCommand.findById(apiId)
    res.status(200).json(api)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiCollection = await CurlCommand.find()
    
    const del = await CurlCommand.deleteMany({})
   
     await Promise.all(apiCollection.map(async(api)=> {
    
      const apiId = api._id?api._id.toString():""
      console.log(apiId)
      if(apiId){
      const result =  await deleteAPIfromAllCollections(apiId)
      }
    }))

    res.status(200).json("All the APIs are deleted")
  } catch (error) {
    next(error)
  }
})


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiIdString =  req.params.id
  

    if (apiIdString) { 
    const api = await CurlCommand.findByIdAndDelete(apiIdString)
    const del = await deleteAPIfromAllCollections(apiIdString)

    res.status(200).json(`${api} is deleted`)
    }
    else{
       return next(new AppError('Invalid API ID format', 400)) // Return error if the ID is invalid
    }
  } catch (error) {
    next(error)
  }
})

export default router
