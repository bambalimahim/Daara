/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { NiveauEtudDetailComponent } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud-detail.component';
import { NiveauEtudService } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.service';
import { NiveauEtud } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.model';

describe('Component Tests', () => {

    describe('NiveauEtud Management Detail Component', () => {
        let comp: NiveauEtudDetailComponent;
        let fixture: ComponentFixture<NiveauEtudDetailComponent>;
        let service: NiveauEtudService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [NiveauEtudDetailComponent],
                providers: [
                    NiveauEtudService
                ]
            })
            .overrideTemplate(NiveauEtudDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NiveauEtudDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveauEtudService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NiveauEtud(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.niveauEtud).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
