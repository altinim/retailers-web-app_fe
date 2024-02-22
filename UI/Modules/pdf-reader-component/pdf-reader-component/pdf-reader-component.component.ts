import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { PdfReaderService } from 'src/Services/Globals/pdf-reader-service'

@Component({
    selector: 'app-pdf-reader-component',
    templateUrl: './pdf-reader-component.component.html',
    styleUrls: ['./pdf-reader-component.component.css'],
    animations: [
        trigger('fadeOut', [
            state('void', style({ opacity: 0 })),
            transition(':leave', [animate(500, style({ opacity: 0 }))]),
        ]),
    ],
})
export class PdfReaderComponentComponent implements OnInit {
    base64Content: string[] = []
    imageUrl: string | undefined
    currentIndex: number = 0
    brochureId: string | null = null

    constructor(
        private pdfReaderService: PdfReaderService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.brochureId = params['id']
            this.loadImages()
        })
    }

    loadImages(): void {
        if (this.brochureId) {
            this.pdfReaderService.getImages(this.brochureId).subscribe(
                (data) => {
                    if (data.length > 0) {
                        this.base64Content = data
                        this.setImageUrl(this.currentIndex)
                    } else {
                        console.warn('No images available.')
                    }
                },
                (error) => {
                    console.error('Error fetching images:', error)
                }
            )
        }
    }

    setImageUrl(index: number): void {
        this.currentIndex = index
        this.imageUrl = `data:image/png;base64,${this.base64Content[index]}`
    }

    nextImage(): void {
        if (this.currentIndex < this.base64Content.length - 1) {
            this.setImageUrl(this.currentIndex + 1)
        }
    }

    prevImage(): void {
        if (this.currentIndex > 0) {
            this.setImageUrl(this.currentIndex - 1)
        }
    }
}
