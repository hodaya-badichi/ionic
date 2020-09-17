export class Request {
    location(location: any) {
      throw new Error("Method not implemented.");
    } 
    RequestCode:number;
    TravelCode?:number;
    UserId:string;
    SourceAddress:string;
    DestinationAddress:string;
    Date:Date;
    Frequency:string;
    Summarry:string;
    NumOfPassengers:number
    constructor(RequestCode:number,UserId:string,SourceAddress:string,DestinationAddress:string,
        Date:Date,Frequency:string, Summarry:string,NumofPassenger:number,TravelCode?:number){
            this.Date=Date;
            this.DestinationAddress=DestinationAddress;
            this.Frequency=Frequency;
            this.RequestCode=RequestCode;
            this.SourceAddress=SourceAddress;
            this.Summarry=Summarry;
            this.TravelCode=TravelCode;
            this.UserId=UserId;   
            this.NumOfPassengers=NumofPassenger;    
        }
}
