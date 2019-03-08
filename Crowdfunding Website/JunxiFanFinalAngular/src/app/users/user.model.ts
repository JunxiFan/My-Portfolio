export class User {
    
        constructor(public userId = null, public roleId: number, 
            public username: string, public name: string, 
            public createdOn:string,  public userStatus:string) {
    
        }
    }