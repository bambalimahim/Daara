import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Inscrit } from './inscrit.model';
import { InscritService } from './inscrit.service';

@Injectable()
export class InscritPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private inscritService: InscritService

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
                this.inscritService.find(id)
                    .subscribe((inscritResponse: HttpResponse<Inscrit>) => {
                        const inscrit: Inscrit = inscritResponse.body;
                        if (inscrit.dateInscrit) {
                            inscrit.dateInscrit = {
                                year: inscrit.dateInscrit.getFullYear(),
                                month: inscrit.dateInscrit.getMonth() + 1,
                                day: inscrit.dateInscrit.getDate()
                            };
                        }
                        this.ngbModalRef = this.inscritModalRef(component, inscrit);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.inscritModalRef(component, new Inscrit());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    inscritModalRef(component: Component, inscrit: Inscrit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.inscrit = inscrit;
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
