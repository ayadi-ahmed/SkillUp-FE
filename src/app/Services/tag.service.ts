import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../Entities/tag";
import {AuthentificationService} from "./authentification.service";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient,
                private authentificationService: AuthentificationService) {
    }

    public getAllTags(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag`);
    }

    public getTagById(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag/${id}`);
    }

    public getTagByName(name: string): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag/name/${name}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }

    public addTag(tag: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/tag/add`, tag,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }

    public updateTag(tag: Tag): Observable<any> {
        return this.http.put<any>(this.apiServerUrl + `/api/tag/update`, tag,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }

    public deleteTag(id: number): Observable<any> {
        return this.http.delete<any>(this.apiServerUrl + `/api/tag/delete/${id}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }

    public affectFormationToTag(formationId: number, tagId: number): Observable<Tag> {
        return this.http.get<any>(this.apiServerUrl + `/api/tag/${tagId}/formation/${formationId}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }
}
