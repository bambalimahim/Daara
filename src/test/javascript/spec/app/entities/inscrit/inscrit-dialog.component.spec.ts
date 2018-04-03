/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DaaraTestModule } from '../../../test.module';
import { InscritDialogComponent } from '../../../../../../main/webapp/app/entities/inscrit/inscrit-dialog.component';
import { InscritService } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.service';
import { Inscrit } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.model';
import { EleveService } from '../../../../../../main/webapp/app/entities/eleve';
import { ClasseService } from '../../../../../../main/webapp/app/entities/classe';

describe('Component Tests', () => {

    describe('Inscrit Management Dialog Component', () => {
        let comp: InscritDialogComponent;
        let fixture: ComponentFixture<InscritDialogComponent>;
        let service: InscritService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [InscritDialogComponent],
                providers: [
                    EleveService,
                    ClasseService,
                    InscritService
                ]
            })
            .overrideTemplate(InscritDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscritDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscritService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inscrit(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscrit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscritListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inscrit();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscrit = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscritListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
