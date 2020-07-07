export class Travel {
    idTravel:number;
    idDriver:number;
    place:string;
    date:Date;
    constructor(idTravel?:number,idDriver?:number,place?:string,date?:Date){
        this.idTravel=idTravel;
        this.idDriver=idDriver;
        this.place=place;
        this.date=date;
    }
}
