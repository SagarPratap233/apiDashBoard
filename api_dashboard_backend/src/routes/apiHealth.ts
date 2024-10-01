import { Router, Request, Response , NextFunction} from 'express'
import { checkAPIHealth } from '../healthChecks/apiHealthCheck'

interface api {
  _id: string
  url: string
  body: object | null
  headers: object
  method: string
  __v: number
}

const router = Router()

router.post('/', async (req: Request, res: Response, next:NextFunction) => {
  const api = req.body as api;

  if (!api) {
    return next(new Error('URL is required'))
  }

  try {
    const result = await checkAPIHealth(api)
    res.status(200).json(result)
  } catch (error) {
    next(error);
  }
})

export default router
