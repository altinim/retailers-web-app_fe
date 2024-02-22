import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { ContainerModule } from '../container/container.module'

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, ContainerModule],
    exports: [HomeComponent],
})
export class HomeModule {}
