import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Eleve } from './eleve.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Eleve>;

@Injectable()
export class EleveService {

    private resourceUrl =  SERVER_API_URL + 'api/eleves';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(eleve: Eleve): Observable<EntityResponseType> {
        const copy = this.convert(eleve);
        return this.http.post<Eleve>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(eleve: Eleve): Observable<EntityResponseType> {
        const copy = this.convert(eleve);
        return this.http.put<Eleve>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Eleve>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Eleve[]>> {
        const options = createRequestOption(req);
        return this.http.get<Eleve[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Eleve[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Eleve = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Eleve[]>): HttpResponse<Eleve[]> {
        const jsonResponse: Eleve[] = res.body;
        const body: Eleve[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Eleve.
     */
    private convertItemFromServer(eleve: Eleve): Eleve {
        const copy: Eleve = Object.assign({}, eleve);
        copy.dateNaissance = this.dateUtils
            .convertLocalDateFromServer(eleve.dateNaissance);
        return copy;
    }

    /**
     * Convert a Eleve to a JSON which can be sent to the server.
     */
    private convert(eleve: Eleve): Eleve {
        const copy: Eleve = Object.assign({}, eleve);
        copy.dateNaissance = this.dateUtils
            .convertLocalDateToServer(eleve.dateNaissance);
        return copy;
    }
}
