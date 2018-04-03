/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { EleveComponent } from '../../../../../../main/webapp/app/entities/eleve/eleve.component';
import { EleveService } from '../../../../../../main/webapp/app/entities/eleve/eleve.service';
import { Eleve } from '../../../../../../main/webapp/app/entities/eleve/eleve.model';

describe('Component Tests', () => {

    describe('Eleve Management Component', () => {
        let comp: EleveComponent;
        let fixture: ComponentFixture<EleveComponent>;
        let service: EleveService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [EleveComponent],
                providers: [
                    EleveService
                ]
            })
            .overrideTemplate(EleveComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EleveComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EleveService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Eleve(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.eleves[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
