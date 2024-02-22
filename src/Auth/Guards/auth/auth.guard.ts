import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from 'src/Auth/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
    const userRole = AuthService.getCurrentUserRole()

    if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        return false
    }

    return true
}
