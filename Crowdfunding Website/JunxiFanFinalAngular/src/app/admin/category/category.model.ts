export class Category {

    constructor(public cateId = null,
        public cateName: string,
        public cateDesc?: string,
        public cateStatus?: string,
        public cateTotal?: number) {

    }
}
