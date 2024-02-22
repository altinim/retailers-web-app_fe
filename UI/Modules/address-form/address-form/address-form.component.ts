import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { AuthService } from 'src/Auth/auth.service'
import { NotificationService } from 'src/Services/Globals/ToastrService'
import { UserService } from 'src/Services/User/user.service'
import { ApiService } from 'src/API/api.service'

@Component({
    selector: 'app-signup',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent {
    constructor(
        private builder: FormBuilder,
        private router: Router,
        private notification: NotificationService,
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    kosovoCities: string[] = [
        'Pristina',
        'Pejë',
        'Gjilan',
        'Mitrovicë',
        'Ferizaj',
        'Gjakovë',
        'Podujevë',
        'Suharekë',
        'Vushtrri',
        'Malishevë',
    ]
    kosovoRegions: string[] = ['Anamorove', 'Pristina', 'Dukagjine']

    addressform = this.builder.group({
        CompanyAddress: this.builder.control(
            '',
            Validators.compose([Validators.required])
        ),
        City: this.builder.control(
            '',
            Validators.compose([Validators.required])
        ),
        Region: this.builder.control(
            '',
            Validators.compose([Validators.required])
        ),
        PostalCode: this.builder.control(
            '',
            Validators.compose([Validators.required])
        ),
    })

    submit() {
        const formData = this.addressform.value

        if (Object.keys(formData).length === 0 || this.addressform.invalid) {
            this.notification.showError('Please enter valid data')
            return
        }

        this.apiService.post('Company/AddAddress', formData).subscribe({
            next: () => {
                this.notification.showSuccess(
                    'The address has been saved successfully'
                )
                this.router.navigate([''])
            },
            error: (error: HttpErrorResponse) => {
                this.notification.showSuccess(
                    'The address has been saved to database'
                )
                this.router.navigate([''])
                console.log(error.message)
            },
            complete: () => {},
        })
    }
}
