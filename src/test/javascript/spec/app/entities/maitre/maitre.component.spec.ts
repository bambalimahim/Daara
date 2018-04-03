/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { MaitreComponent } from '../../../../../../main/webapp/app/entities/maitre/maitre.component';
import { MaitreService } from '../../../../../../main/webapp/app/entities/maitre/maitre.service';
import { Maitre } from '../../../../../../main/webapp/app/entities/maitre/maitre.model';

describe('Component Tests', () => {

    describe('Maitre Management Component', () => {
        let comp: MaitreComponent;
        let fixture: ComponentFixture<MaitreComponent>;
        let service: MaitreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [MaitreComponent],
                providers: [
                    MaitreService
                ]
            })
            .overrideTemplate(MaitreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaitreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaitreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Maitre(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.maitres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
