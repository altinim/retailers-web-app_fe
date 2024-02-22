import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrochureFormComponent } from './brochure-form/brochure-form.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { SharedModule } from '../shared/shared.module'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatListModule } from '@angular/material/list'

import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [BrochureFormComponent],
    exports: [BrochureFormComponent],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
    ],
})
export class BrochureFormModule {}
