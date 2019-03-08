export class Idea {

    constructor(public ideaId = null, public cateId: number,
        public userId: number, public ideaStatus: string,
        public createdOn: string, public ideaRemark: string, 
        public ideaName: string, public ideaDesc: string, 
        public ideaEnddate: string, public ideaAim: number) {

    }
}