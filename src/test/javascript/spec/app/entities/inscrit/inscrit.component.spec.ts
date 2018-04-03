/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { InscritComponent } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.component';
import { InscritService } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.service';
import { Inscrit } from '../../../../../../main/webapp/app/entities/inscrit/inscrit.model';

describe('Component Tests', () => {

    describe('Inscrit Management Component', () => {
        let comp: InscritComponent;
        let fixture: ComponentFixture<InscritComponent>;
        let service: InscritService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [InscritComponent],
                providers: [
                    InscritService
                ]
            })
            .overrideTemplate(InscritComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscritComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscritService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Inscrit(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inscrits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
