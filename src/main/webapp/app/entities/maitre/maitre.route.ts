import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MaitreComponent } from './maitre.component';
import { MaitreDetailComponent } from './maitre-detail.component';
import { MaitrePopupComponent } from './maitre-dialog.component';
import { MaitreDeletePopupComponent } from './maitre-delete-dialog.component';

export const maitreRoute: Routes = [
    {
        path: 'maitre',
        component: MaitreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.maitre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'maitre/:id',
        component: MaitreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.maitre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const maitrePopupRoute: Routes = [
    {
        path: 'maitre-new',
        component: MaitrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.maitre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'maitre/:id/edit',
        component: MaitrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.maitre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'maitre/:id/delete',
        component: MaitreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.maitre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
