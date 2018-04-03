import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Eleve } from './eleve.model';
import { EleveService } from './eleve.service';

@Component({
    selector: 'jhi-eleve-detail',
    templateUrl: './eleve-detail.component.html'
})
export class EleveDetailComponent implements OnInit, OnDestroy {

    eleve: Eleve;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eleveService: EleveService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEleves();
    }

    load(id) {
        this.eleveService.find(id)
            .subscribe((eleveResponse: HttpResponse<Eleve>) => {
                this.eleve = eleveResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEleves() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eleveListModification',
            (response) => this.load(this.eleve.id)
        );
    }
}
