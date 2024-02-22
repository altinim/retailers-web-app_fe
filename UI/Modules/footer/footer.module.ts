import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './footer/footer.component'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, AppRoutingModule],
    exports: [FooterComponent],
})
export class FooterModule {}
