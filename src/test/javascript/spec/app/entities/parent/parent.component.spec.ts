/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { ParentComponent } from '../../../../../../main/webapp/app/entities/parent/parent.component';
import { ParentService } from '../../../../../../main/webapp/app/entities/parent/parent.service';
import { Parent } from '../../../../../../main/webapp/app/entities/parent/parent.model';

describe('Component Tests', () => {

    describe('Parent Management Component', () => {
        let comp: ParentComponent;
        let fixture: ComponentFixture<ParentComponent>;
        let service: ParentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [ParentComponent],
                providers: [
                    ParentService
                ]
            })
            .overrideTemplate(ParentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Parent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.parents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
