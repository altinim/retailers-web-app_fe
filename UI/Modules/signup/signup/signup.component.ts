import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { AuthService } from 'src/Auth/auth.service'
import { NotificationService } from 'src/Services/Globals/ToastrService'
import { UserService } from 'src/Services/User/user.service'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
    constructor(
        private builder: FormBuilder,
        private router: Router,
        private notification: NotificationService,
        private http: HttpClient,
        private authService: AuthService
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
    kosovoRegions: string[] = ['Anamorove', 'Pristina']

    signupform = this.builder.group({
        Name: this.builder.control(
            '',
            Validators.compose([Validators.required])
        ),
        CompanyName: this.builder.control(
            '',
            Validators.compose([Validators.required])
        ),
        Email: this.builder.control(
            '',
            Validators.compose([Validators.required, Validators.email])
        ),
        Password: this.builder.control(
            '',
            Validators.compose([Validators.required, Validators.minLength(6)])
        ),
    })

    proceedsignup() {
        if (this.signupform.valid) {
            const signupData = this.signupform.value

            this.authService.signUp(signupData).subscribe(
                (response: any) => {
                    const responseBody = response.body
                    this.notification.showSuccess(
                        'The user has been registered!'
                    )
                    this.router.navigate(['login'])
                },
                (error: HttpErrorResponse) => {
                    this.notification.showError(error.error)
                }
            )
        } else {
            this.notification.showError('Please enter valid data')
        }
    }

    hidden: boolean = true
}
