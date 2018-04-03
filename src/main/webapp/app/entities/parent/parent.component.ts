import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Parent } from './parent.model';
import { ParentService } from './parent.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-parent',
    templateUrl: './parent.component.html'
})
export class ParentComponent implements OnInit, OnDestroy {
parents: Parent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private parentService: ParentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.parentService.query().subscribe(
            (res: HttpResponse<Parent[]>) => {
                this.parents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInParents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Parent) {
        return item.id;
    }
    registerChangeInParents() {
        this.eventSubscriber = this.eventManager.subscribe('parentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
