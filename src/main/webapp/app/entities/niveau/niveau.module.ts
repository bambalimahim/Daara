import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaaraSharedModule } from '../../shared';
import {
    NiveauService,
    NiveauPopupService,
    NiveauComponent,
    NiveauDetailComponent,
    NiveauDialogComponent,
    NiveauPopupComponent,
    NiveauDeletePopupComponent,
    NiveauDeleteDialogComponent,
    niveauRoute,
    niveauPopupRoute,
    NiveauResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...niveauRoute,
    ...niveauPopupRoute,
];

@NgModule({
    imports: [
        DaaraSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NiveauComponent,
        NiveauDetailComponent,
        NiveauDialogComponent,
        NiveauDeleteDialogComponent,
        NiveauPopupComponent,
        NiveauDeletePopupComponent,
    ],
    entryComponents: [
        NiveauComponent,
        NiveauDialogComponent,
        NiveauPopupComponent,
        NiveauDeleteDialogComponent,
        NiveauDeletePopupComponent,
    ],
    providers: [
        NiveauService,
        NiveauPopupService,
        NiveauResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraNiveauModule {}
