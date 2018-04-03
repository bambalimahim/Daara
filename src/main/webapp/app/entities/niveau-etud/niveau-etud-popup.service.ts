import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { NiveauEtud } from './niveau-etud.model';
import { NiveauEtudService } from './niveau-etud.service';

@Injectable()
export class NiveauEtudPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private niveauEtudService: NiveauEtudService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.niveauEtudService.find(id)
                    .subscribe((niveauEtudResponse: HttpResponse<NiveauEtud>) => {
                        const niveauEtud: NiveauEtud = niveauEtudResponse.body;
                        if (niveauEtud.dateNiveau) {
                            niveauEtud.dateNiveau = {
                                year: niveauEtud.dateNiveau.getFullYear(),
                                month: niveauEtud.dateNiveau.getMonth() + 1,
                                day: niveauEtud.dateNiveau.getDate()
                            };
                        }
                        this.ngbModalRef = this.niveauEtudModalRef(component, niveauEtud);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.niveauEtudModalRef(component, new NiveauEtud());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    niveauEtudModalRef(component: Component, niveauEtud: NiveauEtud): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.niveauEtud = niveauEtud;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
