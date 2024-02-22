import { Component, Input, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import {
    Brochure,
    BrochureService,
} from 'src/Services/Globals/brochure.service'

@Component({
    selector: 'app-brochures-table',
    templateUrl: './brochures-table.component.html',
    styleUrls: ['./brochures-table.component.css'],
})
export class BrochuresTableComponent {
    @Input() IsApproved!: boolean
    brochure: Brochure[] = []
    displayedColumns: string[] = [
        'title',
        'brochureId',
        'startDate',
        'expiryDate',
        'edit',
    ]
    dataSource = new MatTableDataSource<Brochure>()
    @ViewChild(MatPaginator) paginator!: MatPaginator
    edit: boolean = false

    constructor(private _brochureService: BrochureService) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
        this.loadBrochures()
    }

    public loadBrochures(): void {
        const pageNumber = 1
        const pageSize = 100

        this._brochureService
            .getBrochuresWithPagination(pageNumber, pageSize, this.IsApproved)
            .subscribe({
                next: (data) => {
                    this.dataSource.data = data
                },
                error: (error) => {
                    console.error('Error fetching brochures:', error)
                },
            })
    }

    public deleteBrochure(id: number): void {
        const confirmDelete = confirm(
            'Are you sure you want to delete this brochure?'
        )
        console.log('Deleting brochure with ID:', id)

        if (confirmDelete) {
            this._brochureService.deleteBrochure(id).subscribe({
                next: (deletedBrochure) => {
                    console.log('Deleted Brochure:', deletedBrochure)
                    this.loadBrochures()
                },
                error: (error) => {
                    console.error('Error deleting brochure:', error)
                },
            })
        }
    }
}
