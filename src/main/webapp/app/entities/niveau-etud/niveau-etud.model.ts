import { BaseEntity } from './../../shared';

export class NiveauEtud implements BaseEntity {
    constructor(
        public id?: number,
        public dateNiveau?: any,
        public etudiant?: BaseEntity,
        public niveau?: BaseEntity,
    ) {
    }
}
