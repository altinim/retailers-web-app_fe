// user.service.ts
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../API/api.service'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userEndpoint = 'users'
    constructor(private apiService: ApiService) {}

    // GET all users
    getUsers(): Observable<User[]> {
        return this.apiService.get<User[]>(this.userEndpoint)
    }

    // GET user by ID
    getUserById(userId: number): Observable<User> {
        return this.apiService.get<User>(`${this.userEndpoint}/${userId}`)
    }

    // POST create a new user
    createUser(user: User): Observable<User> {
        return this.apiService.post<User>(this.userEndpoint, user)
    }

    // PUT update an existing user
    updateUser(userId: number, updatedUser: User): Observable<User> {
        return this.apiService.put<User>(
            `${this.userEndpoint}/${userId}`,
            updatedUser
        )
    }

    // DELETE user by ID
    deleteUser(userId: number): Observable<User> {
        return this.apiService.delete<User>(`${this.userEndpoint}/${userId}`)
    }

    // GET all users with pagination
    getUsersWithPagination(
        pageNumber: number,
        pageSize: number,
        isApproved: boolean
    ): Observable<User[]> {
        return this.apiService.getWithPagination<User[]>(
            this.userEndpoint,
            pageNumber,
            pageSize,
            isApproved
        )
    }
    //SAVE USER
    saveUserRole(userId: number, selectedRole: string): Observable<any> {
        const url = `${this.userEndpoint}/${userId}/role`
        return this.apiService.put(url, { role: selectedRole })
    }

    //APROVE USER
    approveUser(userId: number): Observable<any> {
        const approveUrl = `${this.userEndpoint}/approve?userId=${userId}`
        return this.apiService.put(approveUrl,null)
    }
}
export interface User {
    id: number
    name: string
    location: string
    role: string
    companyId: string
    email: string
    isApproved: boolean
    selectionMade?: boolean
}
