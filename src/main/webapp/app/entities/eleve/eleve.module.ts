import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaaraSharedModule } from '../../shared';
import {
    EleveService,
    ElevePopupService,
    EleveComponent,
    EleveDetailComponent,
    EleveDialogComponent,
    ElevePopupComponent,
    EleveDeletePopupComponent,
    EleveDeleteDialogComponent,
    eleveRoute,
    elevePopupRoute,
    EleveResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eleveRoute,
    ...elevePopupRoute,
];

@NgModule({
    imports: [
        DaaraSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EleveComponent,
        EleveDetailComponent,
        EleveDialogComponent,
        EleveDeleteDialogComponent,
        ElevePopupComponent,
        EleveDeletePopupComponent,
    ],
    entryComponents: [
        EleveComponent,
        EleveDialogComponent,
        ElevePopupComponent,
        EleveDeleteDialogComponent,
        EleveDeletePopupComponent,
    ],
    providers: [
        EleveService,
        ElevePopupService,
        EleveResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraEleveModule {}
