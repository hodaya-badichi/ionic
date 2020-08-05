export class Comments {
    CommentId:number;
    UserId:string;
    RequestCode:number;
    Summarry:string;
    Date:Date;
    constructor( CommentId:number, UserId:string,RequestCode:number,Summarry:string,Date:Date){
        this.CommentId=CommentId;
        this.UserId = UserId;
        this.RequestCode = RequestCode;
        this.Summarry = Summarry;
        this.Date = Date;
    }      
}
