import { BaseEntity } from './../../shared';

export class Inscrit implements BaseEntity {
    constructor(
        public id?: number,
        public dateInscrit?: any,
        public etudiant?: BaseEntity,
        public niveau?: BaseEntity,
    ) {
    }
}
