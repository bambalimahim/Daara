/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaaraTestModule } from '../../../test.module';
import { ClasseComponent } from '../../../../../../main/webapp/app/entities/classe/classe.component';
import { ClasseService } from '../../../../../../main/webapp/app/entities/classe/classe.service';
import { Classe } from '../../../../../../main/webapp/app/entities/classe/classe.model';

describe('Component Tests', () => {

    describe('Classe Management Component', () => {
        let comp: ClasseComponent;
        let fixture: ComponentFixture<ClasseComponent>;
        let service: ClasseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [ClasseComponent],
                providers: [
                    ClasseService
                ]
            })
            .overrideTemplate(ClasseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClasseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClasseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Classe(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.classes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
