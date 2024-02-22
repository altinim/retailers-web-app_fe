import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { CardModule } from 'UI/Modules/card/card.module'
import { DetailsModule } from 'UI/Modules/details/details.module'
import { ContainerModule } from 'UI/Modules/container/container.module'
import { HeaderModule } from 'UI/Modules/header/header.module'
import { HomeModule } from 'UI/Modules/home/home.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginModule } from 'UI/Modules/login/login.module'
import { SignupModule } from 'UI/Modules/signup/signup.module'
import { AppRoutingModule } from 'src/Routing/app-routing/app-routing.module'
import { ToastrModule } from 'ngx-toastr'
import { AdminDashboardModule } from 'UI/Modules/admin-dashboard/admin-dashboard.module'
import { BrochureFormComponent } from 'UI/Modules/brochure-form/brochure-form/brochure-form.component'
import { BrochureFormModule } from 'UI/Modules/brochure-form/brochure-form.module'
import { FormsModule } from '@angular/forms'
import { CompanyHomePageModule } from 'UI/Modules/company-home-page/company-home-page.module'
import { PdfReaderComponentModule } from 'UI/Modules/pdf-reader-component/pdf-reader-component.module'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { BrochuresTableModule } from 'UI/Modules/brochures-table/brochures-table.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from 'src/Auth/Interceptors/auth.interceptor'
import { AddressFormModule } from 'UI/Modules/address-form/address-form.module'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CardModule,
        DetailsModule,
        HomeModule,
        AdminDashboardModule,
        BrowserAnimationsModule,
        LoginModule,
        BrochureFormModule,
        FormsModule,
        SignupModule,
        PdfReaderComponentModule,
        AppRoutingModule,
        CompanyHomePageModule,
        MatFormFieldModule,
        MatInputModule,
        BrochuresTableModule,
        AddressFormModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
