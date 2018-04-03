import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Niveau } from './niveau.model';
import { NiveauPopupService } from './niveau-popup.service';
import { NiveauService } from './niveau.service';

@Component({
    selector: 'jhi-niveau-delete-dialog',
    templateUrl: './niveau-delete-dialog.component.html'
})
export class NiveauDeleteDialogComponent {

    niveau: Niveau;

    constructor(
        private niveauService: NiveauService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niveauService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'niveauListModification',
                content: 'Deleted an niveau'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niveau-delete-popup',
    template: ''
})
export class NiveauDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niveauPopupService: NiveauPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.niveauPopupService
                .open(NiveauDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
