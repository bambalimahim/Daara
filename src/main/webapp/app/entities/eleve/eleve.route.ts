import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EleveComponent } from './eleve.component';
import { EleveDetailComponent } from './eleve-detail.component';
import { ElevePopupComponent } from './eleve-dialog.component';
import { EleveDeletePopupComponent } from './eleve-delete-dialog.component';

@Injectable()
export class EleveResolvePagingParams implements Resolve<any> {

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

export const eleveRoute: Routes = [
    {
        path: 'eleve',
        component: EleveComponent,
        resolve: {
            'pagingParams': EleveResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.eleve.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'eleve/:id',
        component: EleveDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.eleve.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const elevePopupRoute: Routes = [
    {
        path: 'eleve-new',
        component: ElevePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.eleve.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'eleve/:id/edit',
        component: ElevePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.eleve.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'eleve/:id/delete',
        component: EleveDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'daaraApp.eleve.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
