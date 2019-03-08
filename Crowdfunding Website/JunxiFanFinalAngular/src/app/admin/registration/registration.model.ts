export class Registration {
    
        
    constructor(public userId = null, public roleId: number, 
        public username: string, public password:string,
        public name: string, public compName:string,public cateId: number){}
    }