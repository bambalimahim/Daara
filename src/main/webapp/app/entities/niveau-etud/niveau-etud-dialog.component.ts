import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NiveauEtud } from './niveau-etud.model';
import { NiveauEtudPopupService } from './niveau-etud-popup.service';
import { NiveauEtudService } from './niveau-etud.service';
import { Eleve, EleveService } from '../eleve';
import { Niveau, NiveauService } from '../niveau';

@Component({
    selector: 'jhi-niveau-etud-dialog',
    templateUrl: './niveau-etud-dialog.component.html'
})
export class NiveauEtudDialogComponent implements OnInit {

    niveauEtud: NiveauEtud;
    isSaving: boolean;

    eleves: Eleve[];

    niveaus: Niveau[];
    dateNiveauDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private niveauEtudService: NiveauEtudService,
        private eleveService: EleveService,
        private niveauService: NiveauService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eleveService.query()
            .subscribe((res: HttpResponse<Eleve[]>) => { this.eleves = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.niveauService.query()
            .subscribe((res: HttpResponse<Niveau[]>) => { this.niveaus = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.niveauEtud.id !== undefined) {
            this.subscribeToSaveResponse(
                this.niveauEtudService.update(this.niveauEtud));
        } else {
            this.subscribeToSaveResponse(
                this.niveauEtudService.create(this.niveauEtud));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NiveauEtud>>) {
        result.subscribe((res: HttpResponse<NiveauEtud>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NiveauEtud) {
        this.eventManager.broadcast({ name: 'niveauEtudListModification', content: 'OK'});
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

    trackNiveauById(index: number, item: Niveau) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-niveau-etud-popup',
    template: ''
})
export class NiveauEtudPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niveauEtudPopupService: NiveauEtudPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.niveauEtudPopupService
                    .open(NiveauEtudDialogComponent as Component, params['id']);
            } else {
                this.niveauEtudPopupService
                    .open(NiveauEtudDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
