import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {checkAPIHealth} from './healthChecks/apiHealthCheck';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(express.json());
app.get('/', async (req: Request, res: Response)=> {
    res.json({"homepage": true});

});

app.get('/apiHealth', async (req: Request, res: Response) => {
    const url = req.query.url as string;
    if(!url)
        {
            res.status(500).json({"error": "Url is required"});
        }

    try{
        const result = await checkAPIHealth(url);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(500).json({"error": "Internal server error"})
    }
  
})

app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}`)
});