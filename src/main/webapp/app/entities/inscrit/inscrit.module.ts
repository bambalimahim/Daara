import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaaraSharedModule } from '../../shared';
import {
    InscritService,
    InscritPopupService,
    InscritComponent,
    InscritDetailComponent,
    InscritDialogComponent,
    InscritPopupComponent,
    InscritDeletePopupComponent,
    InscritDeleteDialogComponent,
    inscritRoute,
    inscritPopupRoute,
} from './';

const ENTITY_STATES = [
    ...inscritRoute,
    ...inscritPopupRoute,
];

@NgModule({
    imports: [
        DaaraSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InscritComponent,
        InscritDetailComponent,
        InscritDialogComponent,
        InscritDeleteDialogComponent,
        InscritPopupComponent,
        InscritDeletePopupComponent,
    ],
    entryComponents: [
        InscritComponent,
        InscritDialogComponent,
        InscritPopupComponent,
        InscritDeleteDialogComponent,
        InscritDeletePopupComponent,
    ],
    providers: [
        InscritService,
        InscritPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraInscritModule {}
