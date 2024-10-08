// declare namespace Express {
//   interface User {
//     id: number;
//     email: string;
//     createdAt: Date;
//   }
// }
import { Request } from "express";
import DataLoader from "dataloader";
import { Todo } from "@prisma/client";

export interface MyRequest extends Request {
  loaders: {
    todoLoader: DataLoader;
  };
}
