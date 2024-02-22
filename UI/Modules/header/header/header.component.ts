import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/Auth/auth.service'
import { NotificationService } from 'src/Services/Globals/ToastrService'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    constructor(
        private router: Router,
        private notifcation: NotificationService
    ) {}

    isAuthTokenPresent() {
        const authToken = sessionStorage.getItem('authToken')
        return authToken !== null
    }

    logout() {
        sessionStorage.removeItem('authToken')
        this.router.navigate(['/login'])
        this.notifcation.showInfo('you are now logged out ')
    }

    isAdmin() {
        return AuthService.getCurrentUserRole()?.toUpperCase() === 'ADMIN'
    }
    isManager() {
        return AuthService.getCurrentUserRole()?.toUpperCase() === 'MANAGER'
    }
}
