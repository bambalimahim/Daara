/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DaaraTestModule } from '../../../test.module';
import { ClasseDetailComponent } from '../../../../../../main/webapp/app/entities/classe/classe-detail.component';
import { ClasseService } from '../../../../../../main/webapp/app/entities/classe/classe.service';
import { Classe } from '../../../../../../main/webapp/app/entities/classe/classe.model';

describe('Component Tests', () => {

    describe('Classe Management Detail Component', () => {
        let comp: ClasseDetailComponent;
        let fixture: ComponentFixture<ClasseDetailComponent>;
        let service: ClasseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DaaraTestModule],
                declarations: [ClasseDetailComponent],
                providers: [
                    ClasseService
                ]
            })
            .overrideTemplate(ClasseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClasseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClasseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Classe(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.classe).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
