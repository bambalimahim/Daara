/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { ParentDetailComponent } from '../../../../../../main/webapp/app/entities/parent/parent-detail.component';
import { ParentService } from '../../../../../../main/webapp/app/entities/parent/parent.service';
import { Parent } from '../../../../../../main/webapp/app/entities/parent/parent.model';

describe('Component Tests', () => {

    describe('Parent Management Detail Component', () => {
        let comp: ParentDetailComponent;
        let fixture: ComponentFixture<ParentDetailComponent>;
        let service: ParentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [ParentDetailComponent],
                providers: [
                    ParentService
                ]
            })
            .overrideTemplate(ParentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Parent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
