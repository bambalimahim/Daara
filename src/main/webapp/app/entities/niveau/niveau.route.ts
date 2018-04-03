import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { NiveauComponent } from './niveau.component';
import { NiveauDetailComponent } from './niveau-detail.component';
import { NiveauPopupComponent } from './niveau-dialog.component';
import { NiveauDeletePopupComponent } from './niveau-delete-dialog.component';

@Injectable()
export class NiveauResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const niveauRoute: Routes = [
    {
        path: 'niveau',
        component: NiveauComponent,
        resolve: {
            'pagingParams': NiveauResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveau.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'niveau/:id',
        component: NiveauDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveau.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niveauPopupRoute: Routes = [
    {
        path: 'niveau-new',
        component: NiveauPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveau.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'niveau/:id/edit',
        component: NiveauPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveau.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'niveau/:id/delete',
        component: NiveauDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.niveau.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
