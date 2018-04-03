import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Inscrit } from './inscrit.model';
import { InscritService } from './inscrit.service';

@Component({
    selector: 'jhi-inscrit-detail',
    templateUrl: './inscrit-detail.component.html'
})
export class InscritDetailComponent implements OnInit, OnDestroy {

    inscrit: Inscrit;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inscritService: InscritService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInscrits();
    }

    load(id) {
        this.inscritService.find(id)
            .subscribe((inscritResponse: HttpResponse<Inscrit>) => {
                this.inscrit = inscritResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInscrits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inscritListModification',
            (response) => this.load(this.inscrit.id)
        );
    }
}
