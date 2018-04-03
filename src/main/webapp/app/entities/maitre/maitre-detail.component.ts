import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Maitre } from './maitre.model';
import { MaitreService } from './maitre.service';

@Component({
    selector: 'jhi-maitre-detail',
    templateUrl: './maitre-detail.component.html'
})
export class MaitreDetailComponent implements OnInit, OnDestroy {

    maitre: Maitre;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private maitreService: MaitreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaitres();
    }

    load(id) {
        this.maitreService.find(id)
            .subscribe((maitreResponse: HttpResponse<Maitre>) => {
                this.maitre = maitreResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaitres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'maitreListModification',
            (response) => this.load(this.maitre.id)
        );
    }
}
