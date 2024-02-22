import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { BrochureModule } from "../brochure/brochure.module";



@NgModule({
    declarations: [
        DetailsComponent
    ],
    exports: [
        DetailsComponent
    ],
    imports: [
        CommonModule, SharedModule,
        BrochureModule
    ]
})
export class DetailsModule { }
