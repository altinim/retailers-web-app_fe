import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContainerComponent } from './container/container.component'
import { HomeModule } from '../home/home.module'
import { HeaderModule } from '../header/header.module'
import { MainModule } from '../main/main.module'
import { FooterModule } from '../footer/footer.module'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'

@NgModule({
    declarations: [ContainerComponent],
    imports: [CommonModule, HeaderModule, MainModule, FooterModule, AppRoutingModule],
    exports: [ContainerComponent],
})
export class ContainerModule {}
