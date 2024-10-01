import { Request, Response, NextFunction } from "express";
import AppError from "./appError";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = err.message  || 'Internal Server Error';

    res.status(statusCode).json({
       error: 
       { 
       success: false,
       status: statusCode,
       message
       }
    })
}