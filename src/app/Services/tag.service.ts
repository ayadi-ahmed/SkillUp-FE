import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../Entities/tag";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getAllTags(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag`);
    }

    public getTagById(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag/${id}`);
    }

    public getTagByName(name: string): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag/name/${name}`);
    }

    public addTag(tag: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/tag/add`, tag);
    }

    public updateTag(tag: Tag): Observable<any> {
        return this.http.put<any>(this.apiServerUrl + `/api/tag/update`, tag);
    }

    public deleteTag(id: number): Observable<any> {
        return this.http.delete<any>(this.apiServerUrl + `/api/tag/delete/${id}`);
    }

    public affectFormationToTag(formationId: number, tagId: number): Observable<Tag> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag/${tagId}/formation/${formationId}`);
    }
}
