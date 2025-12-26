// src/types/express.d.ts
import { SignupInput } from "../validators/auth.validators";

declare global {
  namespace Express {
    interface Request {
      user?: SignupInput;
    }
  }
}
