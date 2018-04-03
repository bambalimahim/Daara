import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Maitre } from './maitre.model';
import { MaitrePopupService } from './maitre-popup.service';
import { MaitreService } from './maitre.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-maitre-dialog',
    templateUrl: './maitre-dialog.component.html'
})
export class MaitreDialogComponent implements OnInit {

    maitre: Maitre;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private maitreService: MaitreService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.maitre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.maitreService.update(this.maitre));
        } else {
            this.subscribeToSaveResponse(
                this.maitreService.create(this.maitre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Maitre>>) {
        result.subscribe((res: HttpResponse<Maitre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Maitre) {
        this.eventManager.broadcast({ name: 'maitreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-maitre-popup',
    template: ''
})
export class MaitrePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private maitrePopupService: MaitrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.maitrePopupService
                    .open(MaitreDialogComponent as Component, params['id']);
            } else {
                this.maitrePopupService
                    .open(MaitreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
