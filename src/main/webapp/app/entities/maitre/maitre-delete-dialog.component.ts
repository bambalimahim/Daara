import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Maitre } from './maitre.model';
import { MaitrePopupService } from './maitre-popup.service';
import { MaitreService } from './maitre.service';

@Component({
    selector: 'jhi-maitre-delete-dialog',
    templateUrl: './maitre-delete-dialog.component.html'
})
export class MaitreDeleteDialogComponent {

    maitre: Maitre;

    constructor(
        private maitreService: MaitreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.maitreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'maitreListModification',
                content: 'Deleted an maitre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-maitre-delete-popup',
    template: ''
})
export class MaitreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private maitrePopupService: MaitrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.maitrePopupService
                .open(MaitreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
