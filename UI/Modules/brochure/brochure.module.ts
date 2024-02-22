import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { BrochureComponent } from './brochure/brochure.component'
import { MatButtonModule } from '@angular/material/button' // Import MatButtonModule
import { SharedModule } from '../shared/shared.module'
@NgModule({
    declarations: [BrochureComponent],
    exports: [BrochureComponent],
    imports: [CommonModule, MatButtonModule, SharedModule],
})
export class BrochureModule {}
