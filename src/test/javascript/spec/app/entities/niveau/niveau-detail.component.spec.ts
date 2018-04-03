/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { NiveauDetailComponent } from '../../../../../../main/webapp/app/entities/niveau/niveau-detail.component';
import { NiveauService } from '../../../../../../main/webapp/app/entities/niveau/niveau.service';
import { Niveau } from '../../../../../../main/webapp/app/entities/niveau/niveau.model';

describe('Component Tests', () => {

    describe('Niveau Management Detail Component', () => {
        let comp: NiveauDetailComponent;
        let fixture: ComponentFixture<NiveauDetailComponent>;
        let service: NiveauService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [NiveauDetailComponent],
                providers: [
                    NiveauService
                ]
            })
            .overrideTemplate(NiveauDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NiveauDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveauService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Niveau(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.niveau).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
