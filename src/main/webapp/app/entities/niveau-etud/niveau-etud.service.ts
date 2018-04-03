import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NiveauEtud } from './niveau-etud.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NiveauEtud>;

@Injectable()
export class NiveauEtudService {

    private resourceUrl =  SERVER_API_URL + 'api/niveau-etuds';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(niveauEtud: NiveauEtud): Observable<EntityResponseType> {
        const copy = this.convert(niveauEtud);
        return this.http.post<NiveauEtud>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(niveauEtud: NiveauEtud): Observable<EntityResponseType> {
        const copy = this.convert(niveauEtud);
        return this.http.put<NiveauEtud>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NiveauEtud>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NiveauEtud[]>> {
        const options = createRequestOption(req);
        return this.http.get<NiveauEtud[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NiveauEtud[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NiveauEtud = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NiveauEtud[]>): HttpResponse<NiveauEtud[]> {
        const jsonResponse: NiveauEtud[] = res.body;
        const body: NiveauEtud[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NiveauEtud.
     */
    private convertItemFromServer(niveauEtud: NiveauEtud): NiveauEtud {
        const copy: NiveauEtud = Object.assign({}, niveauEtud);
        copy.dateNiveau = this.dateUtils
            .convertLocalDateFromServer(niveauEtud.dateNiveau);
        return copy;
    }

    /**
     * Convert a NiveauEtud to a JSON which can be sent to the server.
     */
    private convert(niveauEtud: NiveauEtud): NiveauEtud {
        const copy: NiveauEtud = Object.assign({}, niveauEtud);
        copy.dateNiveau = this.dateUtils
            .convertLocalDateToServer(niveauEtud.dateNiveau);
        return copy;
    }
}
