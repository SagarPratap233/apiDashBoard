import express, {Request, Response} from 'express';

const app = express();
const  port = 8000;

app.get('/', (req: Request, res: Response)=> {
    res.send("Well");

});

app.listen(8000, ()=> {
    console.log("Server is listening at 8000")
});