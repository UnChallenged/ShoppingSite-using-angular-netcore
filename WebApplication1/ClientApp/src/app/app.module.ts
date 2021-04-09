import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopnavbarComponent } from './main/topnavbar/topnavbar.component';
import { MainHomeComponent } from './main/main-home/main-home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddproductsComponent } from './AdminComponents/addproducts/addproducts.component';
import { ManageProductsComponent } from './AdminComponents/manage-products/manage-products.component';
import { ManageOrdersComponent } from './AdminComponents/manage-orders/manage-orders.component';
import { ManageUsersComponent } from './AdminComponents/manage-users/manage-users.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ManageprofileComponent } from './UserComponents/manageprofile/manageprofile.component';
import { MyOrdersComponent } from './UserComponents/my-orders/my-orders.component';
import { MainService } from './Services/MainService.service';
import { ProductsComponent } from './main/products/products.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { LoginComponent } from './login/login.component';
import { CustomerGuard } from './guards/customer.guard';
import { AdminGuard } from './guards/admin.guard';
import { HttpInterceptorService } from './Services/http-interceptor.service';
import { ErrorInterceptorService } from './Services/error-interceptor.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartService } from './Services/cartservice.service';
import { DatePipe } from '@angular/common';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { DirectaccessService } from './guard/directaccess.service';
import { SingleProductComponent } from './single-product/single-product.component';
import { SignupComponent } from './main/signup/signup.component';
import { DialogOverviewUserinfoComponent } from './AdminComponents/dialog-overview-userinfo/dialog-overview-userinfo.component';
import { FooterComponent } from './main/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    TopnavbarComponent,
    MainHomeComponent,
    AdminDashboardComponent,
    AddproductsComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ManageUsersComponent,
    UserDashboardComponent,
    ManageprofileComponent,
    MyOrdersComponent,
    ProductsComponent,
    CartSummaryComponent,
    CartDetailsComponent,
    LoginComponent,
    CheckoutComponent,
    ConfirmedComponent,
    SingleProductComponent,
    SignupComponent,
    DialogOverviewUserinfoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    TableModule,
    MatPaginatorModule,
    RouterModule.forRoot([
    { path: '', component: MainHomeComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminDashboardComponent,
        children: [
            { path: 'manageorders', component: ManageOrdersComponent },
            { path: 'addproducts', component: AddproductsComponent },
            { path: 'manageproducts', component: ManageProductsComponent },
            { path: 'product/edit/:id', component: AddproductsComponent },
            { path: 'manageusers', component: ManageUsersComponent }
        ], canActivate: [AdminGuard]
    },
    {
        path: 'user', component: UserDashboardComponent, canActivate: [CustomerGuard],
        children: [
            { path: 'manageprofile', component: ManageprofileComponent },
            { path: 'myorders', component: MyOrdersComponent }
        ]
    },
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'product/:id', component: SingleProductComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'confirmed', component: CheckoutComponent, data: { kind: 'confirmed' }, canActivate: [DirectaccessService] }
], { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule
  ],
  providers: [DatePipe,MainService, CartService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
