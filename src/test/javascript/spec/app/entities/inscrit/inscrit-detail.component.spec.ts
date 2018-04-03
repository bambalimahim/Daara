/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { InscritDetailComponent } from '../../../../../../main/webapp/app/entities/inscrit/inscrit-detail.component';
import { InscritService } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.service';
import { Inscrit } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.model';

describe('Component Tests', () => {

    describe('Inscrit Management Detail Component', () => {
        let comp: InscritDetailComponent;
        let fixture: ComponentFixture<InscritDetailComponent>;
        let service: InscritService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [InscritDetailComponent],
                providers: [
                    InscritService
                ]
            })
            .overrideTemplate(InscritDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscritDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscritService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Inscrit(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inscrit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
