export class OrderHis {
    constructor(
        public orderId = null,
        public orderStatus:string,
        public createOn:string,
        public payValue:number,
        public fundId:number,
        public buyAmount: number) { }
}