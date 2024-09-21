import { Router, Request, Response } from 'express'
import { checkAPIHealth } from '../healthChecks/apiHealthCheck'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const url = req.query.url as string
  if (!url) {
    return res.status(500).json({ error: 'URL is required' })
  }

  try {
    const result = await checkAPIHealth(url)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
