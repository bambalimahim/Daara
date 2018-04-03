import { BaseEntity } from './../../shared';

export class Classe implements BaseEntity {
    constructor(
        public id?: number,
        public codeClasse?: string,
        public nomClasse?: string,
        public inscrits?: BaseEntity[],
        public maitre?: BaseEntity,
    ) {
    }
}
