import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import apiHealthRoutes from './routes/apiHealth';
import curlCommandRoutes from './routes/curlCommand';
import checkHealthPerAPI from './routes/checkHealthPerAPI'
import fetchCollection from './routes/fetchCollections'
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandle';
import {collection} from './models/apiCollection';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log('MongoDB connection error', err);
});


app.use(express.json());

app.get('/', async (req: Request, res: Response)=> {
    res.json({"homepage": true});

});

app.use('/apiHealth', apiHealthRoutes)
app.use('/curlCommands', curlCommandRoutes)
app.use('/checkHealthPerAPI', checkHealthPerAPI)
app.use('/collections', fetchCollection)

app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}`)
});

app.use(errorHandler);