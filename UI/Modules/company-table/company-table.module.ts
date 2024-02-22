import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CompanyTableComponent } from './company-table/company-table.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonComponent } from '../shared/button/button.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
    declarations: [CompanyTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    exports: [CompanyTableComponent],
})
export class CompanyTableModule {}
