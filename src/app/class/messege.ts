export class Messege {
    MessegeCode:string;
    TravelCode:string;
    UserId:string;
    IsAdd?:boolean;
    summery?:string;
    constructor(MessegeCode:string,TravelCode:string,UserId:string,IsAdd?:boolean,summery?:string){
        this.MessegeCode = MessegeCode;
        this.TravelCode = TravelCode;
        this.UserId = UserId;
        this.IsAdd = IsAdd;
        this.summery=summery;
    }
}

