// src/types/express.d.ts
import { IUser } from '../interfaces/user'; // Import your user interface

declare global {
  namespace Express {
    export interface Request {
      user?: IUser; // Extend the Request type with the user property
    }
  }
}
