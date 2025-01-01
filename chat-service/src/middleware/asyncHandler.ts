import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from '.';

type AsyncFunction = (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncFunction) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch((error: Error) => {
            res.status(500).json({ message: error.message });
        });
    };
};

export default asyncHandler;