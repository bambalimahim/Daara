import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NiveauEtud } from './niveau-etud.model';
import { NiveauEtudService } from './niveau-etud.service';

@Component({
    selector: 'jhi-niveau-etud-detail',
    templateUrl: './niveau-etud-detail.component.html'
})
export class NiveauEtudDetailComponent implements OnInit, OnDestroy {

    niveauEtud: NiveauEtud;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private niveauEtudService: NiveauEtudService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNiveauEtuds();
    }

    load(id) {
        this.niveauEtudService.find(id)
            .subscribe((niveauEtudResponse: HttpResponse<NiveauEtud>) => {
                this.niveauEtud = niveauEtudResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNiveauEtuds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'niveauEtudListModification',
            (response) => this.load(this.niveauEtud.id)
        );
    }
}
