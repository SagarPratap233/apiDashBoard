import cron from 'node-cron'
import { collection } from '../models/apiCollection';
import { apiHealthCheckPerCollection, checkAPIHealth } from './apiHealthCheck';
import { CurlCommand } from '../models/curlCommand';
import { ApiResult } from '../models/apiResult';

interface api {
  _id: string
  url: string
  body: object | null
  headers: object
  method: string
  __v: number
}

const scheduleJobs = new Map<string, cron.ScheduledTask>();

export const polls = async (id:string) => {
    try{
    const collectionExtracted = await collection.findById(id);
    // console.log(collectionExtracted);
    if(!collectionExtracted)
        {
           return  console.error("Collection does not exist")
        }
    for(const Api of collectionExtracted.apis)
        {
          const {api, interval} = Api;
          const jobkey = `${api}-${interval}`
          

          if (scheduleJobs.has(jobkey))
            {
                scheduleJobs.get(jobkey)?.stop();
                scheduleJobs.delete(jobkey);
            }
            const job = cron.schedule(`*/${interval} * * * * *`, async () => {
              const actualAPI: api | null = await CurlCommand.findById(api)
              if (!actualAPI) {
                console.error(`api with ${api} Id does not exist`)
                return
              } 
              try{
                const result = await checkAPIHealth(actualAPI)
                console.log(`The health results for ${actualAPI.url}: ${JSON.stringify(result)}`)
                const apiRes = new ApiResult({
                  collectionId:id,
                  api: actualAPI._id,
                  url: actualAPI.url,
                  latency: result.latency,
                  status: result.status,
                  success: result.success,
                  timeStamp: new Date(),
                })

                await apiRes.save()
              }
              catch(error)
              {
                console.error(`Error while checking health of an ${actualAPI.url}`, error)
              }
             
            })
            scheduleJobs.set(jobkey, job)
        }
    }
    catch(error)
    {
        console.error('Error polling apis:', error)
    }

}

export const stopPolls = async (id:string) => {
  try {
    const collectionExtracted = await collection.findById(id)
    // console.log(collectionExtracted);
    if (!collectionExtracted) {
      return console.error('Collection does not exist')
    }
    for (const Api of collectionExtracted.apis) {
      const { api, interval } = Api
      const jobkey = `${api}-${interval}`

      if (scheduleJobs.has(jobkey)) {
        scheduleJobs.get(jobkey)?.stop()
      }
    
    }
  } catch (error) {
    console.error('Error polling apis:', error)
  }
}