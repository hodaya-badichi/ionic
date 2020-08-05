export class User {
    UserId: string;
    UserFirstName: string;
    UserLastName: string;
    UserMail: string;
    UserPassword: string;
    UserPhone: string;
    IsDriver:boolean;
    constructor(UserId: string, UserFirstName: string, UserLastName: string, UserMail: string, UserPassword: string, UserPhone: string,IsDriver:boolean) {
       this.UserId = UserId;
       this.UserFirstName = UserFirstName;
       this.UserLastName = UserLastName;
       this.UserMail = UserMail;
       this.UserPassword = UserPassword;
       this.UserPhone = UserPhone;
       this.IsDriver=IsDriver;
    }





}
