import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Eleve } from './eleve.model';
import { ElevePopupService } from './eleve-popup.service';
import { EleveService } from './eleve.service';
import { Parent, ParentService } from '../parent';

@Component({
    selector: 'jhi-eleve-dialog',
    templateUrl: './eleve-dialog.component.html'
})
export class EleveDialogComponent implements OnInit {

    eleve: Eleve;
    isSaving: boolean;

    parents: Parent[];
    dateNaissanceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eleveService: EleveService,
        private parentService: ParentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.parentService.query()
            .subscribe((res: HttpResponse<Parent[]>) => { this.parents = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.eleve.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eleveService.update(this.eleve));
        } else {
            this.subscribeToSaveResponse(
                this.eleveService.create(this.eleve));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Eleve>>) {
        result.subscribe((res: HttpResponse<Eleve>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Eleve) {
        this.eventManager.broadcast({ name: 'eleveListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackParentById(index: number, item: Parent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-eleve-popup',
    template: ''
})
export class ElevePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private elevePopupService: ElevePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.elevePopupService
                    .open(EleveDialogComponent as Component, params['id']);
            } else {
                this.elevePopupService
                    .open(EleveDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
