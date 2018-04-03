import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaaraSharedModule } from '../../shared';
import { DaaraAdminModule } from '../../admin/admin.module';
import {
    MaitreService,
    MaitrePopupService,
    MaitreComponent,
    MaitreDetailComponent,
    MaitreDialogComponent,
    MaitrePopupComponent,
    MaitreDeletePopupComponent,
    MaitreDeleteDialogComponent,
    maitreRoute,
    maitrePopupRoute,
} from './';

const ENTITY_STATES = [
    ...maitreRoute,
    ...maitrePopupRoute,
];

@NgModule({
    imports: [
        DaaraSharedModule,
        DaaraAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaitreComponent,
        MaitreDetailComponent,
        MaitreDialogComponent,
        MaitreDeleteDialogComponent,
        MaitrePopupComponent,
        MaitreDeletePopupComponent,
    ],
    entryComponents: [
        MaitreComponent,
        MaitreDialogComponent,
        MaitrePopupComponent,
        MaitreDeleteDialogComponent,
        MaitreDeletePopupComponent,
    ],
    providers: [
        MaitreService,
        MaitrePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DaaraMaitreModule {}
