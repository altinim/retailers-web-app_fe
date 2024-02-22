import { NgModule } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { GoogleCardModule } from '../google-card/google-card.module'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'
import { MatCardModule } from '@angular/material/card'
import { UserService } from 'src/Services/User/user.service'
import { HttpClientModule } from '@angular/common/http'
import { MatSelectModule } from '@angular/material/select'
import { AddressFormComponent } from './address-form/address-form.component'

@NgModule({
    declarations: [AddressFormComponent],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        GoogleCardModule,
        SharedModule,
        AppRoutingModule,
        MatCardModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSelectModule,
    ],
    exports: [AddressFormComponent],
})
export class AddressFormModule {}
