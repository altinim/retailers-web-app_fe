import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/Environments/enviroment'
import { ApiService } from 'src/API/api.service'
@Injectable({
    providedIn: 'root',
})
export class PdfReaderService {
    private apiUrl = 'https://localhost:7187/api/brochures/images'
    private thumbnailUrl = `brochures/thumbnail`
    constructor(
        private httpClient: HttpClient,
        private apiService: ApiService
    ) {}

    getImages(id: string): Observable<string[]> {
        const url = `${this.apiUrl}?id=${id}`

        return this.httpClient.get(url, { responseType: 'text' }).pipe(
            map((data: string) => {
                try {
                    const jsonData = JSON.parse(data)

                    if (Array.isArray(jsonData) && jsonData.length > 0) {
                        return jsonData
                    } else {
                        console.warn('No images available.')
                        return []
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error)
                    return []
                }
            }),
            catchError((error) => {
                return throwError(() => error)
            })
        )
    }
    getThumbnail(brochureId: string): Observable<string> {
        const url = `${this.thumbnailUrl}?id=${brochureId}`

        return this.apiService.get<{ thumbnail: string }>(url).pipe(
            map((response) => response.thumbnail),
            catchError((error: any) => {
                console.error('Error fetching thumbnail content:', error)
                return throwError(() => error)
            })
        )
    }
}
