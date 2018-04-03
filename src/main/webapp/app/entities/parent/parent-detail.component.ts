import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Parent } from './parent.model';
import { ParentService } from './parent.service';

@Component({
    selector: 'jhi-parent-detail',
    templateUrl: './parent-detail.component.html'
})
export class ParentDetailComponent implements OnInit, OnDestroy {

    parent: Parent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parentService: ParentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParents();
    }

    load(id) {
        this.parentService.find(id)
            .subscribe((parentResponse: HttpResponse<Parent>) => {
                this.parent = parentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'parentListModification',
            (response) => this.load(this.parent.id)
        );
    }
}
