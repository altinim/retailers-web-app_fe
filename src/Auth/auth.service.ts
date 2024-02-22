import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/Environments/enviroment'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from 'jwt-decode'

interface SignInResponse {
    username: string
    token: string
    companyId: string | null
}

interface CustomJwtPayload extends JwtPayload {
    role: string
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'https://localhost:7187/Authentication'
    jwtToken: string | null = null

    constructor(private http: HttpClient) {}

    signIn(userData: any): Observable<HttpResponse<SignInResponse>> {
        return this.http
            .post<SignInResponse>(`${this.apiUrl}/signin`, userData, {
                observe: 'response',
            })
            .pipe(
                tap((response) => {
                    this.jwtToken = response.body?.token || null
                    console.log('JWT Token:', this.jwtToken)
                }),
                catchError((error) => throwError(error))
            )
    }

    signUp(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, userData)
    }
    static decodeToken(): CustomJwtPayload | null {
        const token = sessionStorage.getItem('authToken')

        if (token) {
            try {
                const decoded = jwtDecode(token) as CustomJwtPayload
                return decoded
            } catch (error) {
                console.error(error)
                throw new Error('Invalid token')
            }
        }
        return null
    }

    static getCurrentUserRole(): string | undefined {
        return this.decodeToken()?.role
    }

    static isLoggedIn(): boolean {
        return !(
            sessionStorage.getItem('authToken') !== null &&
            sessionStorage.getItem('authToken') !== 'undefined'
        )
    }
}
