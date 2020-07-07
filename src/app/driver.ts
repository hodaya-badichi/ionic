export class Driver {
    
    EmployeeCode:string;
    EmployeeName:string;
    EmployeePassword:string;
    EmployeeAdress:string;
    EmployeePhoneNumber:string;
    EmployeeEmail:string;
    constructor(EmployeeCode?:string,EmployeeName?:string, EmployeePassword?:string,EmployeeAdress?:string,EmployeePhoneNumber?:string,EmployeeEmail?:string){
       
        this.EmployeeCode=EmployeeCode;
        this.EmployeeName=EmployeeName;
        this.EmployeePassword=EmployeePassword;
       this. EmployeeAdress=EmployeeAdress;
       this.EmployeePhoneNumber=EmployeePhoneNumber;
       this.EmployeeEmail=EmployeeEmail;
    }
    

}
