import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Classe } from './classe.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Classe>;

@Injectable()
export class ClasseService {

    private resourceUrl =  SERVER_API_URL + 'api/classes';

    constructor(private http: HttpClient) { }

    create(classe: Classe): Observable<EntityResponseType> {
        const copy = this.convert(classe);
        return this.http.post<Classe>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(classe: Classe): Observable<EntityResponseType> {
        const copy = this.convert(classe);
        return this.http.put<Classe>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Classe>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Classe[]>> {
        const options = createRequestOption(req);
        return this.http.get<Classe[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Classe[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Classe = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Classe[]>): HttpResponse<Classe[]> {
        const jsonResponse: Classe[] = res.body;
        const body: Classe[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Classe.
     */
    private convertItemFromServer(classe: Classe): Classe {
        const copy: Classe = Object.assign({}, classe);
        return copy;
    }

    /**
     * Convert a Classe to a JSON which can be sent to the server.
     */
    private convert(classe: Classe): Classe {
        const copy: Classe = Object.assign({}, classe);
        return copy;
    }
}
