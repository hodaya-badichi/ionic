export class Request {
    RequestCode:number;
    TravelCode?:number;
    UserId:string;
    SourceAddress:string;
    DestinationAddress:string;
    //Seats
    Date:Date;
    Frequency:string;
    Summarry:string;
    constructor(RequestCode:number,UserId:string,SourceAddress:string,DestinationAddress:string,
        Date:Date,Frequency:string, Summarry:string,TravelCode?:number){
            this.Date=Date;
            this.DestinationAddress=DestinationAddress;
            this.Frequency=Frequency;
            this.RequestCode=RequestCode;
            this.SourceAddress=SourceAddress;
            this.Summarry=Summarry;
            this.TravelCode=TravelCode;
            this.UserId=UserId;       
        }
}
