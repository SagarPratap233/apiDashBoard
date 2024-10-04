import axios, {AxiosError}from 'axios';
import {collection} from '../models/apiCollection'
import { CurlCommand } from '../models/curlCommand';


interface healthOutput{
    status : number | null;
    latency : number | null;
    success: boolean;
}

interface api {
  _id: string
  url: string
  body: object | null
  headers: object
  method: string
  __v :number
}

export const checkAPIHealth = async(api: api|null): Promise<healthOutput> => {
  if(api){
    const {url, headers, method} = api;
    
    const headersConvert:object = Object.entries(headers)
    try{
        const startTime = Date.now();
        if(method.toLowerCase()=='get')
            {
                
                const response = await axios.get(url, {
                  headers: headersConvert,
                })
             
                 const latency = Date.now() - startTime
                //  console.log(latency, response.status)

                return {
                   status: response.status,
                   latency,
                   success: true,
                 }
            }
      
       return {
         status: 500,
         latency: null,
         success: false,
       }
        
        
    }
    catch(error)
    {
        const axiosError = error as AxiosError;
        return {
          status: axiosError.response?.status || 500,
          latency: null,
          success: false,
        }
    }
  }
  return  {
         status: 500,
         latency: null,
         success: false,
       }
}


export const apiHealthCheckPerCollection = async (id: string) => {
  const apiCollection = await collection.findById(id).populate('apis');
  console.log(apiCollection)
  if(!apiCollection){
    return null;
  }
  const result = await Promise.all(apiCollection.apis.map(async (api)=> {
    const apiRecord :api|null= await  CurlCommand.findById(api.api);
    if(apiRecord)
      {
        const res = await checkAPIHealth(apiRecord)
        return res;
      }
     return null;
  }))
  return result;

}