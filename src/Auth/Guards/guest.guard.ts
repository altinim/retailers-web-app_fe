import { CanActivateFn } from '@angular/router'
import { AuthService } from '../auth.service'
export const guestGuard: CanActivateFn = (route, state) => {

  return AuthService.isLoggedIn()
}
