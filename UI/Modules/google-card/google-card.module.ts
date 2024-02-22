import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GoogleCardComponent } from './google-card/google-card.component'

@NgModule({
    declarations: [GoogleCardComponent],
    imports: [CommonModule],
    exports: [GoogleCardComponent],
})
export class GoogleCardModule {}
