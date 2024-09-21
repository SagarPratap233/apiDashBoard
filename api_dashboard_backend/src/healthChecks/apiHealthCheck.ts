import axios, {AxiosError}from 'axios';

interface healthOutput{
    status : number | null;
    latency : number | null;
    success: boolean;
}
export const checkAPIHealth = async(url:string): Promise<healthOutput> => {
    try{
        const startTime = Date.now();
        const response = await axios.get(url);
        const latency = Date.now()-startTime;
        
        return {
            status: response.status,
            latency,
            success: true
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