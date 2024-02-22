import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from './button/button.component'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    declarations: [ButtonComponent, ButtonComponent],
    imports: [CommonModule],
    exports: [ButtonComponent],
})
export class SharedModule {}
