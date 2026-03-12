import { Menu } from "./menu";
import { User } from "./user";

export class Response {
  statusCode: number = 0;
  message: string = '';
  data: User | Menu[] = new User();
}
