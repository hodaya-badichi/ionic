export class Travels {
    TravleCode: number;
    UserId:string;
    Date: Date;
    SourceAddress: string;
    DestinationAddress: string;
    NumOfPassengers: number;
    Price:number;
    constructor(TravleCode: number, UserId: string, Date: Date, SourceAddress: string, DestinationAddress: string, NumOfPassengers: number,Price?:number) {
        this.TravleCode = TravleCode,
        this.UserId = UserId,
        this.Date = Date,
        this.SourceAddress = SourceAddress,
        this.DestinationAddress = DestinationAddress,
        this.NumOfPassengers = NumOfPassengers,
        this.Price=Price
    }
}

