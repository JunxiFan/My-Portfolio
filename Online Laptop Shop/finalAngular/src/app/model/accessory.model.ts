export class AccessoryModel {
    _id: string;
    accName: string;
    accDesc: string;
    accType: string;
    // __v: string;

    constructor(accName: string, desc: string, type: string, id=null, v?: string) {
        this.accName = accName;
        this.accDesc = desc;
        this.accType = type;
        this._id = id;
        // this.__v = v;

    }
}