export class Service {
    constructor(
        public servId = null,
        public servStatus: string,
        public servDdl: string,
        public reward: number,
        public servDesc: string,
        public ideaId: number) { }
}