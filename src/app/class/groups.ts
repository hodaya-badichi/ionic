import { Travels } from './travels';
import { User } from './user';

export class Groups {
    TravelCode: number;
    UserId: string;
    IsDisable?: boolean;
    constructor(TravelCode:number,UserId:string,IsDisable?:boolean){
        this.TravelCode=TravelCode;
        this.UserId=UserId;
        this.IsDisable=IsDisable;
    }

}
