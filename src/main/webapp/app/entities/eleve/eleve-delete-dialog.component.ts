import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Eleve } from './eleve.model';
import { ElevePopupService } from './eleve-popup.service';
import { EleveService } from './eleve.service';

@Component({
    selector: 'jhi-eleve-delete-dialog',
    templateUrl: './eleve-delete-dialog.component.html'
})
export class EleveDeleteDialogComponent {

    eleve: Eleve;

    constructor(
        private eleveService: EleveService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eleveService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eleveListModification',
                content: 'Deleted an eleve'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-eleve-delete-popup',
    template: ''
})
export class EleveDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private elevePopupService: ElevePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.elevePopupService
                .open(EleveDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
