import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NiveauEtud } from './niveau-etud.model';
import { NiveauEtudService } from './niveau-etud.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-niveau-etud',
    templateUrl: './niveau-etud.component.html'
})
export class NiveauEtudComponent implements OnInit, OnDestroy {
niveauEtuds: NiveauEtud[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private niveauEtudService: NiveauEtudService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.niveauEtudService.query().subscribe(
            (res: HttpResponse<NiveauEtud[]>) => {
                this.niveauEtuds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNiveauEtuds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NiveauEtud) {
        return item.id;
    }
    registerChangeInNiveauEtuds() {
        this.eventSubscriber = this.eventManager.subscribe('niveauEtudListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
