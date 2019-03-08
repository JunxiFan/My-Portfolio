export class ItemModel {
    _id: string;
    lapId: string;
    lapName: string;
    lapPrice: number;
    username: string;
    amount: number;
    lapCPU: string;
    lapGraph: string;
    status: string;

    constructor(lapId: string,
        lapName: string,
        lapPrice: number,
        username: string,
        amount: number,
        lapCPU: string,
        lapGraph: string,
        status: string,
        _id?: string) {
        this.lapId = lapId;
        this.lapName = lapName;
        this.lapPrice = lapPrice;
        this.username = username;
        this.amount = amount;
        this.lapCPU = lapCPU;
        this.lapGraph = lapGraph;
        this.status = status;
        this._id = _id;
    }
}