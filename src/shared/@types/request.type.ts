/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
    };
  }
}
