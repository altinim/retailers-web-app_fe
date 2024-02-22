import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { LogoComponent } from './logo/logo.component'
import { SearchComponent } from './search/search.component'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'

@NgModule({
    declarations: [HeaderComponent, LogoComponent, SearchComponent],
    imports: [CommonModule, AppRoutingModule],
    exports: [HeaderComponent],
})
export class HeaderModule {}
