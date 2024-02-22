import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomePageComponent } from './company-home-page/company-home-page.component';
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module';
import { SharedModule } from "../shared/shared.module";
import {MatTabsModule} from '@angular/material/tabs';
import { CompanyTableModule } from "../company-table/company-table.module";
import { BrochuresTableModule } from '../brochures-table/brochures-table.module';


@NgModule({
    declarations: [
        CompanyHomePageComponent
    ],
    exports: [
        CompanyHomePageComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        SharedModule,
        MatTabsModule,
        CompanyTableModule,
        BrochuresTableModule
    ]
})
export class CompanyHomePageModule { }
