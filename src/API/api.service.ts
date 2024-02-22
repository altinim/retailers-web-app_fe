// api.service.ts
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'
import { ErrorHandlerService } from '../Services/Utils/ErrorHandling/error-handler-service.service'
import { environment } from '../Environments/enviroment'
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = environment.apiUrl

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) {}

    // GET method
    get<T>(endpoint: string): Observable<T> {
        return this.http
            .get<T>(`${this.apiUrl}${endpoint}`, { responseType: 'json' })
            .pipe(
                catchError((error) =>
                    this.errorHandlerService.handleHttpError(error)
                )
            )
    }
    getPlainText<T>(endpoint: string): Observable<T> {
        return this.http
            .get<T>(`${this.apiUrl}${endpoint}`, { responseType: 'text' as 'json' })
            .pipe(
                catchError(error =>
                    this.errorHandlerService.handleHttpError(error)
                )
            );
    }
    // POST method
    post<T>(endpoint: string, data: any, header?: any): Observable<T> {
        const headers = header ? new HttpHeaders(header) : undefined

        return this.http
            .post<T>(`${this.apiUrl}${endpoint}`, data, { headers })
            .pipe(
                catchError((error) =>
                    this.errorHandlerService.handleHttpError(error)
                )
            )
    }

    // PUT method
    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http
            .put<T>(`${this.apiUrl}${endpoint}`, data, {
                responseType: 'text' as 'json',
            })
            .pipe(
                catchError((error) =>
                    this.errorHandlerService.handleHttpError(error)
                )
            )
    }

    // DELETE method
    delete<T>(endpoint: string): Observable<T> {
        return this.http
            .delete<T>(`${this.apiUrl}${endpoint}`)
            .pipe(
                catchError((error) =>
                    this.errorHandlerService.handleHttpError(error)
                )
            )
    }

    // GET method with pagination parameters
    getWithPagination<T>(
        endpoint: string,
        pageNumber: number,
        pageSize: number,
        isApproved: boolean
    ): Observable<T> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('isApproved', isApproved)

        return this.http
            .get<T>(`${this.apiUrl}${endpoint}`, { params })
            .pipe(
                catchError((error) =>
                    this.errorHandlerService.handleHttpError(error)
                )
            )
    }
}
