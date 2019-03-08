export class Bid {
    constructor(
        public bidId = null,
        public bidStatus: string,
        public deliverydate: string,
        public bidAmount: number,
        public bidDesc: string,
        public servId: number,
        public suId: number) { }
}