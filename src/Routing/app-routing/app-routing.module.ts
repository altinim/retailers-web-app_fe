import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddressFormComponent } from 'UI/Modules/address-form/address-form/address-form.component'
import { AdminDashboardComponent } from 'UI/Modules/admin-dashboard/admin-dashboard/admin-dashboard.component'
import { BrochureFormComponent } from 'UI/Modules/brochure-form/brochure-form/brochure-form.component'
import { CardComponent } from 'UI/Modules/card/card/card.component'
import { CompanyHomePageComponent } from 'UI/Modules/company-home-page/company-home-page/company-home-page.component'
import { CompanyTableComponent } from 'UI/Modules/company-table/company-table/company-table.component'
import { DetailsComponent } from 'UI/Modules/details/details/details.component'
import { LoginComponent } from 'UI/Modules/login/login/login.component'
import { MainComponent } from 'UI/Modules/main/main/main.component'
import { PdfReaderComponentComponent } from 'UI/Modules/pdf-reader-component/pdf-reader-component/pdf-reader-component.component'
import { SignupComponent } from 'UI/Modules/signup/signup/signup.component'
import { authGuard } from 'src/Auth/Guards/auth/auth.guard'
import { guestGuard } from 'src/Auth/Guards/guest.guard'
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard],
    },
    { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },
    { path: 'card/:id', component: CardComponent },
    {
        path: 'details/:id',
        component: PdfReaderComponentComponent,
},
    {
        path: 'detail-page/:id',
        component: DetailsComponent,
    },
    {
        path: 'add-brochure',
        component: BrochureFormComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin', 'Manager'] },
    },
    { path: '', component: MainComponent },
    {
        path: 'company-home-page',
        component: CompanyHomePageComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin', 'Manager'] },
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
    },
    {
        path: 'address-form',
        component: AddressFormComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin', 'Manager'] },
    },
    { path: '**', redirectTo: '' },
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
