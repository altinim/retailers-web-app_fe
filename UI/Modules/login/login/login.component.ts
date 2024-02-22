import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CSP_NONCE, Component } from '@angular/core'
import { AuthService } from 'src/Auth/auth.service'
import {
    Form,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms'

import { Router } from '@angular/router'
import { NotificationService } from 'src/Services/Globals/ToastrService'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    constructor(
        private builder: FormBuilder,
        private router: Router,
        private notification: NotificationService,
        private http: HttpClient,
        private authService: AuthService
    ) {}

    loginform = this.builder.group({
        email: this.builder.control(
            '',
            Validators.compose([Validators.required, Validators.email])
        ),
        password: this.builder.control(
            '',
            Validators.compose([Validators.required, Validators.minLength(6)])
        ),
    })

    proceedlogin() {
        if (this.loginform.valid) {
            const loginData = this.loginform.value

            this.authService.signIn(loginData).subscribe(
                (response) => {
                    const responseBody = response.body
                    const token = responseBody!.token
                    sessionStorage.setItem('authToken', token)
                    this.notification.showSuccess('you are logged in')
                    const role = AuthService.getCurrentUserRole()
                    console.log(role)
                    if (role === 'Manager')
                        this.router.navigate(['company-home-page'])
                    else if (role == 'Admin')
                        this.router.navigate(['admin-dashboard'])
                },
                (error: HttpErrorResponse) => {
                    this.notification.showError(error.error)
                    console.log(error.error)
                }
            )
        } else {
            this.notification.showError('Please enter valid data')
        }
    }

    hidden: boolean = true
}
