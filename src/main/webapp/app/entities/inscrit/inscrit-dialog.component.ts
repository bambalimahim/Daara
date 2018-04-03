import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inscrit } from './inscrit.model';
import { InscritPopupService } from './inscrit-popup.service';
import { InscritService } from './inscrit.service';
import { Eleve, EleveService } from '../eleve';
import { Classe, ClasseService } from '../classe';

@Component({
    selector: 'jhi-inscrit-dialog',
    templateUrl: './inscrit-dialog.component.html'
})
export class InscritDialogComponent implements OnInit {

    inscrit: Inscrit;
    isSaving: boolean;

    eleves: Eleve[];

    classes: Classe[];
    dateInscritDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inscritService: InscritService,
        private eleveService: EleveService,
        private classeService: ClasseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eleveService.query()
            .subscribe((res: HttpResponse<Eleve[]>) => { this.eleves = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.classeService.query()
            .subscribe((res: HttpResponse<Classe[]>) => { this.classes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inscrit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inscritService.update(this.inscrit));
        } else {
            this.subscribeToSaveResponse(
                this.inscritService.create(this.inscrit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Inscrit>>) {
        result.subscribe((res: HttpResponse<Inscrit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Inscrit) {
        this.eventManager.broadcast({ name: 'inscritListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEleveById(index: number, item: Eleve) {
        return item.id;
    }

    trackClasseById(index: number, item: Classe) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-inscrit-popup',
    template: ''
})
export class InscritPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscritPopupService: InscritPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inscritPopupService
                    .open(InscritDialogComponent as Component, params['id']);
            } else {
                this.inscritPopupService
                    .open(InscritDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
