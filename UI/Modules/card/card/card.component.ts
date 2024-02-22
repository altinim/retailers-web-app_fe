import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brochure, BrochureService } from 'src/Services/Globals/brochure.service';
import { Address } from 'src/Services/Globals/company.service';
import { environment } from 'src/Environments/enviroment'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  selectedBrochure: Brochure | undefined;
  brochureAddress: Address | undefined; 
  thumbnailUrl: string | undefined
  base64Content: string[] = []
  imageUrl: string | undefined

  
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
            this.selectedBrochure = brochure;
            this.fetchBrochureAddress(brochureId);
            if (this.selectedBrochure.id !== undefined) {
              this.fetchThumbnail(this.selectedBrochure.id.toString());
            }
            

          },
          error => {
            console.error('Error fetching brochure:', error);
          }
        );
      }
    });
  }
  fetchBrochureAddress(brochureId: number): void {
    this.brochureService.getBrochureAddress(brochureId).subscribe(
      address => {
        this.brochureAddress = address;
        console.log(this.brochureAddress);
      },
      error => {
        console.error('Error fetching brochure address:', error);
      }
    );
  }
  fetchThumbnail(brochureId: string): void {
    const apiUrl = `${environment.apiUrl}brochures/images?id=${this.selectedBrochure?.id}`
        this.httpClient.get(apiUrl).subscribe(
            (data: any) => {
                if (Array.isArray(data) && data.length > 0) {
                    this.base64Content = data
                    this.thumbnailUrl = `data:image/png;base64,${this.base64Content[0]}`
                    console.log('Image URL:', this.imageUrl)
                } else {
                    console.warn('No images available.')
                }
            },
            (error) => {
                console.error('Error fetching base64 content:', error)
            }
        )
  }
}