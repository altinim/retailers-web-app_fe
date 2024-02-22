import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import {
    Brochure,
    BrochureService,
} from 'src/Services/Globals/brochure.service'
import { PdfReaderService } from 'src/Services/Globals/pdf-reader-service'
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    brochures: Brochure[] = []
    constructor(private brochureService: BrochureService) {}

    ngOnInit(): void {
        this.loadBrochureData()
    }

    loadBrochureData(): void {
        this.brochureService.getBrochures().subscribe({
            next: (data) => {
                this.brochures = data
            },
            error: (error) => {
                throw new Error(error)
            },
            complete: () => {},
        })
    }
}
