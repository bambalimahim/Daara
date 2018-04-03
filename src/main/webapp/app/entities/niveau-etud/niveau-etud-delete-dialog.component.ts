import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NiveauEtud } from './niveau-etud.model';
import { NiveauEtudPopupService } from './niveau-etud-popup.service';
import { NiveauEtudService } from './niveau-etud.service';

@Component({
    selector: 'jhi-niveau-etud-delete-dialog',
    templateUrl: './niveau-etud-delete-dialog.component.html'
})
export class NiveauEtudDeleteDialogComponent {

    niveauEtud: NiveauEtud;

    constructor(
        private niveauEtudService: NiveauEtudService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niveauEtudService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'niveauEtudListModification',
                content: 'Deleted an niveauEtud'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niveau-etud-delete-popup',
    template: ''
})
export class NiveauEtudDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private niveauEtudPopupService: NiveauEtudPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.niveauEtudPopupService
                .open(NiveauEtudDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
