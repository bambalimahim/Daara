import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParentComponent } from './parent.component';
import { ParentDetailComponent } from './parent-detail.component';
import { ParentPopupComponent } from './parent-dialog.component';
import { ParentDeletePopupComponent } from './parent-delete-dialog.component';

export const parentRoute: Routes = [
    {
        path: 'parent',
        component: ParentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parent/:id',
        component: ParentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parentPopupRoute: Routes = [
    {
        path: 'parent-new',
        component: ParentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parent/:id/edit',
        component: ParentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parent/:id/delete',
        component: ParentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
