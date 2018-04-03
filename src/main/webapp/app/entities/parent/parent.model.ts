import { BaseEntity } from './../../shared';

export class Parent implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public telephone?: string,
        public adresse?: string,
        public eleves?: BaseEntity[],
    ) {
    }
}
