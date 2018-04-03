import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Maitre } from './maitre.model';
import { MaitreService } from './maitre.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-maitre',
    templateUrl: './maitre.component.html'
})
export class MaitreComponent implements OnInit, OnDestroy {
maitres: Maitre[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private maitreService: MaitreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.maitreService.query().subscribe(
            (res: HttpResponse<Maitre[]>) => {
                this.maitres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMaitres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Maitre) {
        return item.id;
    }
    registerChangeInMaitres() {
        this.eventSubscriber = this.eventManager.subscribe('maitreListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
