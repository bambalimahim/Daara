/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DaaraTestModule } from '../../../test.module';
import { NiveauEtudDialogComponent } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud-dialog.component';
import { NiveauEtudService } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.service';
import { NiveauEtud } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.model';
import { EleveService } from '../../../../../../main/webapp/app/entities/eleve';
import { NiveauService } from '../../../../../../main/webapp/app/entities/niveau';

describe('Component Tests', () => {

    describe('NiveauEtud Management Dialog Component', () => {
        let comp: NiveauEtudDialogComponent;
        let fixture: ComponentFixture<NiveauEtudDialogComponent>;
        let service: NiveauEtudService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [NiveauEtudDialogComponent],
                providers: [
                    EleveService,
                    NiveauService,
                    NiveauEtudService
                ]
            })
            .overrideTemplate(NiveauEtudDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NiveauEtudDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveauEtudService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NiveauEtud(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.niveauEtud = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'niveauEtudListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NiveauEtud();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.niveauEtud = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'niveauEtudListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
