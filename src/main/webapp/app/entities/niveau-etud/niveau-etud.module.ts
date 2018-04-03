import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaaraSharedModule } from '../../shared';
import {
    NiveauEtudService,
    NiveauEtudPopupService,
    NiveauEtudComponent,
    NiveauEtudDetailComponent,
    NiveauEtudDialogComponent,
    NiveauEtudPopupComponent,
    NiveauEtudDeletePopupComponent,
    NiveauEtudDeleteDialogComponent,
    niveauEtudRoute,
    niveauEtudPopupRoute,
} from './';

const ENTITY_STATES = [
    ...niveauEtudRoute,
    ...niveauEtudPopupRoute,
];

@NgModule({
    imports: [
        DaaraSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NiveauEtudComponent,
        NiveauEtudDetailComponent,
        NiveauEtudDialogComponent,
        NiveauEtudDeleteDialogComponent,
        NiveauEtudPopupComponent,
        NiveauEtudDeletePopupComponent,
    ],
    entryComponents: [
        NiveauEtudComponent,
        NiveauEtudDialogComponent,
        NiveauEtudPopupComponent,
        NiveauEtudDeleteDialogComponent,
        NiveauEtudDeletePopupComponent,
    ],
    providers: [
        NiveauEtudService,
        NiveauEtudPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraNiveauEtudModule {}
