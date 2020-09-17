export class Opinion {
    OpinionCode:number;
    UserId:string;
    travelCode:number;
    IsLike:boolean;
    DriverId:string;
    Summery:string;
    Stars:number;
    constructor(OpinionCode:number,UserId:string,travelCode:number,DriverId:string,Summery:string,Stars:number,IsLike?:boolean){
       this.OpinionCode= OpinionCode;
       this.UserId= UserId;
       this.travelCode= travelCode;
       this.IsLike= IsLike;
       this.DriverId= DriverId;
       this.Summery= Summery;
       this.Stars= Stars;
    }
}
