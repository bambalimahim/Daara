import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Inscrit } from './inscrit.model';
import { InscritPopupService } from './inscrit-popup.service';
import { InscritService } from './inscrit.service';

@Component({
    selector: 'jhi-inscrit-delete-dialog',
    templateUrl: './inscrit-delete-dialog.component.html'
})
export class InscritDeleteDialogComponent {

    inscrit: Inscrit;

    constructor(
        private inscritService: InscritService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inscritService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inscritListModification',
                content: 'Deleted an inscrit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inscrit-delete-popup',
    template: ''
})
export class InscritDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscritPopupService: InscritPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inscritPopupService
                .open(InscritDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
