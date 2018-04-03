import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Classe } from './classe.model';
import { ClasseService } from './classe.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-classe',
    templateUrl: './classe.component.html'
})
export class ClasseComponent implements OnInit, OnDestroy {
classes: Classe[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classeService: ClasseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.classeService.query().subscribe(
            (res: HttpResponse<Classe[]>) => {
                this.classes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Classe) {
        return item.id;
    }
    registerChangeInClasses() {
        this.eventSubscriber = this.eventManager.subscribe('classeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
