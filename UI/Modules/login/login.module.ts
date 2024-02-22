import { NgModule } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { GoogleCardModule } from '../google-card/google-card.module'
import { SharedModule } from '../shared/shared.module'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [LoginComponent],
    exports: [LoginComponent],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        GoogleCardModule,
        SharedModule,
        AppRoutingModule,
    ],
})
export class LoginModule {}
