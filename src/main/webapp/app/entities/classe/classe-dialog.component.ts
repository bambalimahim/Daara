import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Classe } from './classe.model';
import { ClassePopupService } from './classe-popup.service';
import { ClasseService } from './classe.service';
import { Maitre, MaitreService } from '../maitre';

@Component({
    selector: 'jhi-classe-dialog',
    templateUrl: './classe-dialog.component.html'
})
export class ClasseDialogComponent implements OnInit {

    classe: Classe;
    isSaving: boolean;

    maitres: Maitre[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private classeService: ClasseService,
        private maitreService: MaitreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.maitreService.query()
            .subscribe((res: HttpResponse<Maitre[]>) => { this.maitres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classeService.update(this.classe));
        } else {
            this.subscribeToSaveResponse(
                this.classeService.create(this.classe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Classe>>) {
        result.subscribe((res: HttpResponse<Classe>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Classe) {
        this.eventManager.broadcast({ name: 'classeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaitreById(index: number, item: Maitre) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-classe-popup',
    template: ''
})
export class ClassePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classePopupService: ClassePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classePopupService
                    .open(ClasseDialogComponent as Component, params['id']);
            } else {
                this.classePopupService
                    .open(ClasseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
