import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Inscrit } from './inscrit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Inscrit>;

@Injectable()
export class InscritService {

    private resourceUrl =  SERVER_API_URL + 'api/inscrits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(inscrit: Inscrit): Observable<EntityResponseType> {
        const copy = this.convert(inscrit);
        return this.http.post<Inscrit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inscrit: Inscrit): Observable<EntityResponseType> {
        const copy = this.convert(inscrit);
        return this.http.put<Inscrit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Inscrit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Inscrit[]>> {
        const options = createRequestOption(req);
        return this.http.get<Inscrit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Inscrit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Inscrit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Inscrit[]>): HttpResponse<Inscrit[]> {
        const jsonResponse: Inscrit[] = res.body;
        const body: Inscrit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Inscrit.
     */
    private convertItemFromServer(inscrit: Inscrit): Inscrit {
        const copy: Inscrit = Object.assign({}, inscrit);
        copy.dateInscrit = this.dateUtils
            .convertLocalDateFromServer(inscrit.dateInscrit);
        return copy;
    }

    /**
     * Convert a Inscrit to a JSON which can be sent to the server.
     */
    private convert(inscrit: Inscrit): Inscrit {
        const copy: Inscrit = Object.assign({}, inscrit);
        copy.dateInscrit = this.dateUtils
            .convertLocalDateToServer(inscrit.dateInscrit);
        return copy;
    }
}
