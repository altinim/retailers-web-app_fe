import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/Environments/enviroment';
import { Brochure, BrochureService } from 'src/Services/Globals/brochure.service';
import { Address } from 'src/Services/Globals/company.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  brochure: Brochure | undefined;
  brochureAddress: Address | undefined;
  thumbnailUrl: string | undefined;
  thumbnailUrl1: string | undefined;
  base64Content: string[] = [];
  imageUrl: string | undefined;
  companyBrochures: Brochure[] = [];
  companyName: string = '';
  brochureAddresses: any[] = [];
  currentBrochure: Brochure[] = [];

  constructor(
    private route: ActivatedRoute,
    private brochureService: BrochureService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const brochureId = params['id'];
      if (brochureId) {
        this.brochureService.getBrochureById(brochureId).subscribe(
          brochure => {
            this.brochure = brochure;
            this.fetchBrochureAddress(brochureId);
            if (this.brochure.id !== undefined) {
              this.fetchThumbnail(this.brochure.id.toString());
            }
            if (this.brochure.companyId !== undefined) {
              this.fetchBrochuresByCompanyId(this.brochure.companyId);
            }

            this.brochureService.getCompanyNameByBrochureId(brochureId).subscribe(
              companyName => {
                this.companyName = companyName;
              },
              error => {
                console.error('Error fetching company name:', error);
              }
            );
          },
          error => {
            console.error('Error fetching brochure:', error);
          }
        );
      }
    });
  }

  fetchThumbnail(brochureId: string): void {
    const apiUrl = `${environment.apiUrl}brochures/images?id=${brochureId}`;
    this.httpClient.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.base64Content = data;
          this.thumbnailUrl = `data:image/png;base64,${this.base64Content[0]}`;
          this.thumbnailUrl1 = `data:image/png;base64,${this.base64Content[1]}`;
        } else {
          console.warn('No images available.');
        }
      },
      (error) => {
        console.error('Error fetching base64 content:', error);
      }
    );
  }
  fetchBrochuresByCompanyId(companyId: string): void {
    const apiUrl = `${environment.apiUrl}brochures/companyBrochures/${companyId}`;
    this.httpClient.get<Partial<Brochure>[]>(apiUrl).subscribe(
      (data: Partial<Brochure>[]) => {
        this.companyBrochures = data.map(item => ({
          id: item.id || 0,
          title: item.title || '',
          startDate: new Date(item.startDate || ''),
          expiryDate: new Date(item.expiryDate || ''),
        }));

        const fetchObservables = this.companyBrochures.map(brochure =>
          this.fetchBrochureAddress(brochure.id)
        );

        forkJoin(fetchObservables).subscribe(
          (addresses: Address[]) => {
            console.log('All addresses fetched successfully');
            this.brochureAddresses = addresses;
            console.log(addresses);
          },
          error => {
            console.error('Error fetching addresses:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching brochures by companyId:', error);
      }
    );
  }

  fetchBrochureAddress(brochureId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.brochureService.getBrochureAddress(brochureId).subscribe(
        address => {
          resolve(address);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  getFormattedAddress(index: number): string {
    if (this.brochureAddresses.length === 0) {
      return 'Address not available';
    }

    const address = this.brochureAddresses[index];
    if (address) {
      return `${address.companyAddress}, ${address.city}, ${address.region}, ${address.postalCode}`;
    } else {
      return 'Address not available';
    }
  }
}

