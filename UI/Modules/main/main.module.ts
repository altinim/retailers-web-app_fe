import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main/main.component'
import { BrochureModule } from '../brochure/brochure.module'
import { HeaderModule } from '../header/header.module'

@NgModule({
    declarations: [MainComponent],
    imports: [CommonModule, BrochureModule,HeaderModule],
    exports: [MainComponent],
})
export class MainModule {}
