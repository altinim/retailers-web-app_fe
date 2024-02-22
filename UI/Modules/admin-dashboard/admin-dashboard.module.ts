import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { CompanyTableModule } from '../company-table/company-table.module'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'
import { SharedModule } from '../shared/shared.module'
import { MatTabsModule } from '@angular/material/tabs'
import { BrochuresTableModule } from '../brochures-table/brochures-table.module'

@NgModule({
    declarations: [AdminDashboardComponent],
    imports: [
        CommonModule,
        CompanyTableModule,
        AppRoutingModule,
        SharedModule,
        MatTabsModule,
        CompanyTableModule,
        BrochuresTableModule,
    ],
    exports: [AdminDashboardComponent],
})
export class AdminDashboardModule {}
