import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../../API/api.service'
import { environment } from 'src/Environments/enviroment'
import { HttpHeaders } from '@angular/common/http'
import { Address } from './company.service'

@Injectable({
    providedIn: 'root',
})
export class BrochureService {
    private brochureEndpoint = 'brochures'
    private companyEndpoint = 'Company'
    private thumbnailEndpoint = `${this.brochureEndpoint}/thumbnail`
    private getCompanyBrochures = `${this.brochureEndpoint}/user-company-brochures`

    constructor(private apiService: ApiService) { }

    // GET all brochures
    getBrochures(): Observable<Brochure[]> {
        return this.apiService.get<Brochure[]>(this.brochureEndpoint)
    }

    getUserCompanyBrochures(): Observable<Brochure[]> {
        return this.apiService.get<Brochure[]>(this.getCompanyBrochures)
    }

    // GET brochure by ID
    getBrochureById(brochureId: number): Observable<Brochure> {
        return this.apiService.get<Brochure>(
            `${this.brochureEndpoint}/${brochureId}`
        )
    }

    // POST create a new brochure
    createBrochure(formData: FormData): Observable<Brochure> {
        return this.apiService.post<Brochure>(
            `${this.brochureEndpoint}/AddBrochure`,
            formData
        )
    }

    // PUT update an existing brochure
    updateBrochure(
        brochureId: number,
        updatedBrochure: Brochure
    ): Observable<Brochure> {
        return this.apiService.put<Brochure>(
            `${this.brochureEndpoint}/${brochureId}`,
            updatedBrochure
        )
    }

    // DELETE brochure by ID
    deleteBrochure(brochureId: number): Observable<Brochure> {
        return this.apiService.delete<Brochure>(
            `${this.companyEndpoint}/${brochureId}`
        )
    }

    getBrochuresWithPagination(
        pageNumber: number,
        pageSize: number,
        isApproved: boolean
    ): Observable<Brochure[]> {
        return this.apiService.getWithPagination<Brochure[]>(
            this.getCompanyBrochures,
            pageNumber,
            pageSize,
            isApproved
        )
    }

    getThumbnail(userId: string) {
        const endpoint: string = `${this.thumbnailEndpoint}?id=${userId}`
        return this.apiService.get(endpoint)
    }
    getBrochureAddress(brochureId: number): Observable<Address> {
        return this.apiService.get<Address>(
            `${this.brochureEndpoint}/${brochureId}/address`
        );
    }
    getBrochuresByCompanyId(companyId: number): Observable<any> {
        return this.apiService.get(`getCompanyBrochures/${companyId}`);
    }
    getCompanyNameByBrochureId(brochureId: number): Observable<string> {
        return this.apiService.getPlainText<string>(
            `${this.brochureEndpoint}/companyName?brochureId=${brochureId}`
        );
    }

}

export interface Brochure {
    id: number;
    title: string;
    startDate: Date;
    expiryDate: Date;
    path?: string;
    companyId?: string;
    company?: any; 
    addressId?: number;
    address?: any; 
}