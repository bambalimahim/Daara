import { BaseEntity, User } from './../../shared';

export class Maitre implements BaseEntity {
    constructor(
        public id?: number,
        public matricule?: string,
        public nom?: string,
        public prenom?: string,
        public telephone?: string,
        public adresse?: string,
        public user?: User,
        public classes?: BaseEntity[],
    ) {
    }
}
