import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NiveauEtudComponent } from './niveau-etud.component';
import { NiveauEtudDetailComponent } from './niveau-etud-detail.component';
import { NiveauEtudPopupComponent } from './niveau-etud-dialog.component';
import { NiveauEtudDeletePopupComponent } from './niveau-etud-delete-dialog.component';

export const niveauEtudRoute: Routes = [
    {
        path: 'niveau-etud',
        component: NiveauEtudComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveauEtud.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'niveau-etud/:id',
        component: NiveauEtudDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveauEtud.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niveauEtudPopupRoute: Routes = [
    {
        path: 'niveau-etud-new',
        component: NiveauEtudPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveauEtud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'niveau-etud/:id/edit',
        component: NiveauEtudPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveauEtud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'niveau-etud/:id/delete',
        component: NiveauEtudDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveauEtud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
