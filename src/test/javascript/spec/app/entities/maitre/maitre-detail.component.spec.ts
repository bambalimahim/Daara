/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { MaitreDetailComponent } from '../../../../../../main/webapp/app/entities/maitre/maitre-detail.component';
import { MaitreService } from '../../../../../../main/webapp/app/entities/maitre/maitre.service';
import { Maitre } from '../../../../../../main/webapp/app/entities/maitre/maitre.model';

describe('Component Tests', () => {

    describe('Maitre Management Detail Component', () => {
        let comp: MaitreDetailComponent;
        let fixture: ComponentFixture<MaitreDetailComponent>;
        let service: MaitreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [MaitreDetailComponent],
                providers: [
                    MaitreService
                ]
            })
            .overrideTemplate(MaitreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaitreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaitreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Maitre(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.maitre).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
