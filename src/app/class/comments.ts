export class Comments {
    CommentId:number;
    UserId:string;
    TravelCode:number;
    Summarry:string;
    Date:Date;
    UserName:string;
    constructor( CommentId:number, UserId:string,TravelCode:number,Summarry:string,Date:Date, UserName:string){
        this.CommentId=CommentId;
        this.UserId = UserId;
        this.TravelCode = TravelCode;
        this.Summarry = Summarry;
        this.Date = Date;
        this.UserName=UserName;
    }      
}
