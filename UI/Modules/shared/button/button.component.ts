import { CSP_NONCE, Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input() color = ''
    @Input() textColor = ''
    @Input() label = ''
    @Input() extraText? = ''
    @Input() route?: string

    constructor(private router: Router) {}
    handleClick() {
        if (this.route) {
            this.router.navigate([this.route])
        }
    }
}
