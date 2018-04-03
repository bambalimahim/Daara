import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Niveau } from './niveau.model';
import { NiveauPopupService } from './niveau-popup.service';
import { NiveauService } from './niveau.service';

@Component({
    selector: 'jhi-niveau-dialog',
    templateUrl: './niveau-dialog.component.html'
})
export class NiveauDialogComponent implements OnInit {

    niveau: Niveau;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private niveauService: NiveauService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.niveau.id !== undefined) {
            this.subscribeToSaveResponse(
                this.niveauService.update(this.niveau));
        } else {
            this.subscribeToSaveResponse(
                this.niveauService.create(this.niveau));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Niveau>>) {
        result.subscribe((res: HttpResponse<Niveau>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Niveau) {
        this.eventManager.broadcast({ name: 'niveauListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-niveau-popup',
    template: ''
})
export class NiveauPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niveauPopupService: NiveauPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.niveauPopupService
                    .open(NiveauDialogComponent as Component, params['id']);
            } else {
                this.niveauPopupService
                    .open(NiveauDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
