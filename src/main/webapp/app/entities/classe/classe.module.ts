import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaaraSharedModule } from '../../shared';
import {
    ClasseService,
    ClassePopupService,
    ClasseComponent,
    ClasseDetailComponent,
    ClasseDialogComponent,
    ClassePopupComponent,
    ClasseDeletePopupComponent,
    ClasseDeleteDialogComponent,
    classeRoute,
    classePopupRoute,
} from './';

const ENTITY_STATES = [
    ...classeRoute,
    ...classePopupRoute,
];

@NgModule({
    imports: [
        DaaraSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClasseComponent,
        ClasseDetailComponent,
        ClasseDialogComponent,
        ClasseDeleteDialogComponent,
        ClassePopupComponent,
        ClasseDeletePopupComponent,
    ],
    entryComponents: [
        ClasseComponent,
        ClasseDialogComponent,
        ClassePopupComponent,
        ClasseDeleteDialogComponent,
        ClasseDeletePopupComponent,
    ],
    providers: [
        ClasseService,
        ClassePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraClasseModule {}
