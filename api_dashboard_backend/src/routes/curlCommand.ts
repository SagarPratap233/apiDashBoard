import { Router, Request, Response, NextFunction } from 'express'
import { CurlCommand } from '../models/curlCommand'
import {body, validationResult, ValidationError } from 'express-validator'
import AppError from '../middleware/appError'

const router = Router()

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

export default router
