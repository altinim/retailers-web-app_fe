import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module';



@NgModule({
    declarations: [
        CardComponent
    ],
    exports: [
        CardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule
    ]
})
export class CardModule { }
