import { BaseEntity } from './../../shared';

export class Eleve implements BaseEntity {
    constructor(
        public id?: number,
        public prenom?: string,
        public nom?: string,
        public phoneNumber?: string,
        public adresse?: string,
        public matricule?: string,
        public dateNaissance?: any,
        public inscrits?: BaseEntity[],
        public niveauEtuds?: BaseEntity[],
        public parent?: BaseEntity,
    ) {
    }
}
