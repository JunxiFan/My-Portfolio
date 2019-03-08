export class Report {
    constructor(
        public  repoId=null,
        public  bidId:number,
        public  repoDesc:string,
        public  createdOn:string,
        public  progress:number
       ) { }
}