import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../Utils/ErrorHandling/error-handler-service.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../API/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'Company';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private apiService: ApiService  // Added 'private' modifier
  ) { }

  getAddressesByCompany(): Observable<Address[]> {
    const endpoint = `${this.apiUrl}/GetAddressesByCompany`;
    return this.apiService.get<Address[]>(endpoint);
  }
}

export interface Address {
  addressId: number;
  companyAddress: string;
  city: string;
  region: string;
  postalCode: string;
  companyId: string;
}
