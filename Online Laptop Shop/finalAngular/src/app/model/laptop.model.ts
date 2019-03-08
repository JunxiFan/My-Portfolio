export class LaptopModel {
    _id: string;
    lapName: string;
    lapDesc: string;
    lapBrand: string;
    lapCPU: string;
    lapGraph: string;
    lapPrice: number;

    // __v: string;

    constructor( lapName: string, lapDesc: string, lapBrand: string, lapCPU: string, lapGraph: string, lapPrice: number, _id?: string,) {
        this.lapName = lapName;
        this.lapDesc = lapDesc;
        this.lapBrand = lapBrand;
        this._id = _id;
        this.lapCPU = lapCPU;
        this.lapGraph = lapGraph;
        this.lapPrice = lapPrice;
        // this.__v = v;
    }

}