import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export class BaseHttpService<T> {
    constructor(private httpClient: HttpClient, private authService: AuthService, private url: string) {
        this.url = environment.apiUrl + url;
    }

    /**
     * Get all elements in database.
     */
    find(params?: any): Observable<T[]> {
        return this.httpClient.get<T[]>(this.url, { params, headers: this.authService.getHeaders() });
    }

    /**
     * Get one element.
     * @param id Id of element.
     */
    findOne(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.url}/${id}`, { headers: this.authService.getHeaders()});
    }

    /**
     * Create a new object in database.
     * @param item Object to create.
     */
    create(item: T | FormData): Observable<T> {
        return this.httpClient.post<T>(this.url, item, { headers: this.authService.getHeaders()});
    }

    /**
     * Updates an object in database.
     * @param id Id of element.
     * @param item New data of element.
     */
    update(id: string, item: T | FormData): Observable<T> {
        return this.httpClient.put<T>(`${this.url}/${id}`, item, { headers: this.authService.getHeaders()});
    }

    /**
     * Deletes an object in database.
     * @param id Id of element.
     */
    delete(id: string): Observable<any> {
        return this.httpClient.delete(`${this.url}/${id}`, { headers: this.authService.getHeaders()});
    }
}
