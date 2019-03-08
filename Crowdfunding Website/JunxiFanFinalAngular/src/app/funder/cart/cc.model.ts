export class Cc {
    constructor(
        public  ccId=null,
        public  cardNum:string,
        public  expirMonth:number,
        public  expirYear:number,
        public  cvv:number,
        public  userId:number) { }
}