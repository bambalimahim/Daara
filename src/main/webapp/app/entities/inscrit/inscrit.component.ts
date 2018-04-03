import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inscrit } from './inscrit.model';
import { InscritService } from './inscrit.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-inscrit',
    templateUrl: './inscrit.component.html'
})
export class InscritComponent implements OnInit, OnDestroy {
inscrits: Inscrit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inscritService: InscritService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.inscritService.query().subscribe(
            (res: HttpResponse<Inscrit[]>) => {
                this.inscrits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInscrits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Inscrit) {
        return item.id;
    }
    registerChangeInInscrits() {
        this.eventSubscriber = this.eventManager.subscribe('inscritListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
