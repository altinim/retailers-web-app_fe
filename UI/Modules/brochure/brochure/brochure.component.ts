import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { Brochure } from 'src/Services/Globals/brochure.service'
import { environment } from 'src/Environments/enviroment'
import { Router } from '@angular/router'
@Component({
    selector: 'app-brochure',
    templateUrl: './brochure.component.html',
    styleUrls: ['./brochure.component.css'],
})
export class BrochureComponent implements OnInit {
    @Input() brochure: Brochure | undefined
    thumbnailUrl: string | undefined
    base64Content: string[] = []
    imageUrl: string | undefined
    apiUrl: string = `${environment.apiUrl}brochures/images`

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.loadThumbnails()
    }
    loadThumbnails() {
        const thumbnailUrl = `${this.apiUrl}/?id=${this.brochure?.id}`
        this.httpClient.get(thumbnailUrl).subscribe(
            (data: any) => {
                if (Array.isArray(data) && data.length > 0) {
                    this.base64Content = data
                    this.thumbnailUrl = `data:image/png;base64,${this.base64Content[0]}`
                } else {
                    console.warn('No images available.')
                }
            },
            (error) => {
                console.error('Error fetching base64 content:', error)
            }
        )
    }
    navigateToDetailsPage(brochureId: string | number | undefined): void {
        if (brochureId) {
            this.router.navigate(['/details', brochureId])
        }
    }
    navigateToCardPage(brochureId: string | number | undefined): void {
        if (brochureId) {
            this.router.navigate(['/card', brochureId])
        }
    }
}
