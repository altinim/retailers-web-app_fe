import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService {
    constructor() {}

    handleHttpError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred'

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
        }

        return throwError(errorMessage)
    }
}
