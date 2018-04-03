import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InscritComponent } from './inscrit.component';
import { InscritDetailComponent } from './inscrit-detail.component';
import { InscritPopupComponent } from './inscrit-dialog.component';
import { InscritDeletePopupComponent } from './inscrit-delete-dialog.component';

export const inscritRoute: Routes = [
    {
        path: 'inscrit',
        component: InscritComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.inscrit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inscrit/:id',
        component: InscritDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.inscrit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inscritPopupRoute: Routes = [
    {
        path: 'inscrit-new',
        component: InscritPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.inscrit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscrit/:id/edit',
        component: InscritPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.inscrit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscrit/:id/delete',
        component: InscritDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.inscrit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
