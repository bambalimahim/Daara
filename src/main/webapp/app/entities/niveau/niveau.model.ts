import { BaseEntity } from './../../shared';

export class Niveau implements BaseEntity {
    constructor(
        public id?: number,
        public codeNiveau?: string,
        public niveau?: string,
        public niveauEtuds?: BaseEntity[],
    ) {
    }
}
