export class User {
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  image: string = "";
  userType: UserType = UserType.User
}

export enum UserType {
  Admin,
  User
}
