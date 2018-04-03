import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Niveau } from './niveau.model';
import { NiveauService } from './niveau.service';

@Component({
    selector: 'jhi-niveau-detail',
    templateUrl: './niveau-detail.component.html'
})
export class NiveauDetailComponent implements OnInit, OnDestroy {

    niveau: Niveau;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private niveauService: NiveauService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNiveaus();
    }

    load(id) {
        this.niveauService.find(id)
            .subscribe((niveauResponse: HttpResponse<Niveau>) => {
                this.niveau = niveauResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNiveaus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'niveauListModification',
            (response) => this.load(this.niveau.id)
        );
    }
}
