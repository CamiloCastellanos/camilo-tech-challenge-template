import { User } from "./user";

export class Response {
  statusCode: number = 0;
  message: string = '';
  data: User = new User();
}
