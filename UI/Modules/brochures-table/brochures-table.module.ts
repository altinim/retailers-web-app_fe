import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrochuresTableComponent } from './brochures-table/brochures-table.component';
import { SharedModule } from "../shared/shared.module";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        BrochuresTableComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatPaginatorModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    exports: [
      BrochuresTableComponent
    ]
})
export class BrochuresTableModule { }
