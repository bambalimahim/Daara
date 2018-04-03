import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Maitre } from './maitre.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Maitre>;

@Injectable()
export class MaitreService {

    private resourceUrl =  SERVER_API_URL + 'api/maitres';

    constructor(private http: HttpClient) { }

    create(maitre: Maitre): Observable<EntityResponseType> {
        const copy = this.convert(maitre);
        return this.http.post<Maitre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(maitre: Maitre): Observable<EntityResponseType> {
        const copy = this.convert(maitre);
        return this.http.put<Maitre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Maitre>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Maitre[]>> {
        const options = createRequestOption(req);
        return this.http.get<Maitre[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Maitre[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Maitre = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Maitre[]>): HttpResponse<Maitre[]> {
        const jsonResponse: Maitre[] = res.body;
        const body: Maitre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Maitre.
     */
    private convertItemFromServer(maitre: Maitre): Maitre {
        const copy: Maitre = Object.assign({}, maitre);
        return copy;
    }

    /**
     * Convert a Maitre to a JSON which can be sent to the server.
     */
    private convert(maitre: Maitre): Maitre {
        const copy: Maitre = Object.assign({}, maitre);
        return copy;
    }
}
