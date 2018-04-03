/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { NiveauComponent } from '../../../../../../main/webapp/app/entities/niveau/niveau.component';
import { NiveauService } from '../../../../../../main/webapp/app/entities/niveau/niveau.service';
import { Niveau } from '../../../../../../main/webapp/app/entities/niveau/niveau.model';

describe('Component Tests', () => {

    describe('Niveau Management Component', () => {
        let comp: NiveauComponent;
        let fixture: ComponentFixture<NiveauComponent>;
        let service: NiveauService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [NiveauComponent],
                providers: [
                    NiveauService
                ]
            })
            .overrideTemplate(NiveauComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NiveauComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveauService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Niveau(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.niveaus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
