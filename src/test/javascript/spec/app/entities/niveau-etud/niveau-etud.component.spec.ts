/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { NiveauEtudComponent } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.component';
import { NiveauEtudService } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.service';
import { NiveauEtud } from '../../../../../../main/webapp/app/entities/niveau-etud/niveau-etud.model';

describe('Component Tests', () => {

    describe('NiveauEtud Management Component', () => {
        let comp: NiveauEtudComponent;
        let fixture: ComponentFixture<NiveauEtudComponent>;
        let service: NiveauEtudService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [NiveauEtudComponent],
                providers: [
                    NiveauEtudService
                ]
            })
            .overrideTemplate(NiveauEtudComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NiveauEtudComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveauEtudService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NiveauEtud(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.niveauEtuds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
