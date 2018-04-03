/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { EleveDetailComponent } from '../../../../../../main/webapp/app/entities/eleve/eleve-detail.component';
import { EleveService } from '../../../../../../main/webapp/app/entities/eleve/eleve.service';
import { Eleve } from '../../../../../../main/webapp/app/entities/eleve/eleve.model';

describe('Component Tests', () => {

    describe('Eleve Management Detail Component', () => {
        let comp: EleveDetailComponent;
        let fixture: ComponentFixture<EleveDetailComponent>;
        let service: EleveService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [EleveDetailComponent],
                providers: [
                    EleveService
                ]
            })
            .overrideTemplate(EleveDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EleveDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EleveService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Eleve(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.eleve).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
