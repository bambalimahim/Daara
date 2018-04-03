import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Eleve } from './eleve.model';
import { EleveService } from './eleve.service';

@Injectable()
export class ElevePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private eleveService: EleveService

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
                this.eleveService.find(id)
                    .subscribe((eleveResponse: HttpResponse<Eleve>) => {
                        const eleve: Eleve = eleveResponse.body;
                        if (eleve.dateNaissance) {
                            eleve.dateNaissance = {
                                year: eleve.dateNaissance.getFullYear(),
                                month: eleve.dateNaissance.getMonth() + 1,
                                day: eleve.dateNaissance.getDate()
                            };
                        }
                        this.ngbModalRef = this.eleveModalRef(component, eleve);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eleveModalRef(component, new Eleve());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eleveModalRef(component: Component, eleve: Eleve): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.eleve = eleve;
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
