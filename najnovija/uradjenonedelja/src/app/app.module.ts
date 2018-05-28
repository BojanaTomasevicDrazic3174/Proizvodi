import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { appRoutes } from "./app.router";




// Serivce
import { RegisterService } from "./services/register.service";
import { LoginService } from "./services/login.service";
import { AddCategoryService } from "./services/addcategory.service";
import KategorijeService from "./services/kategorije.service";
import { AddProductService } from './services/productservices/addproductservice';
import { GetProductsService } from './services/productservices/getproductsservice';
import { AddOrderService } from './services/productservices/neworder';
import { GetOrdersService } from './services/ordersservices/getorders.service';
import { GetCategoriesService } from './services/getcategoriesservice';
import { RemoveFromOrderService } from './services/ordersservices/removefromorder.service';
import { DeleteProductService } from './services/productservices/deleteproduct.service';


// Komponente
import { AppComponent } from './app.component';
import LoginComponent from "./pages/login/login.component";
import AddCategoryComponent from "./pages/addcategory/addcategory.component";
import HomeComponent from "./pages/home/home.component";
import CategoriesComponent from "./pages/categories/categories.component";
import AddProductComponent from './pages/addproduct/addproduct.component';
import ProductsComponent from './pages/products/products.component';
import RegisterComponent from "./pages/register/register.component";
import OrdersComponent from './pages/orders/orders.component'



@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, HttpModule],

  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AddCategoryComponent,
    CategoriesComponent,
    AddProductComponent,
    ProductsComponent,
    OrdersComponent
  ],

  providers: [RegisterService,
    LoginService,
    AddCategoryService,
    KategorijeService,
    AddProductService,
    GetProductsService,
    AddOrderService,
    GetOrdersService,
    RemoveFromOrderService,
    DeleteProductService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {


}
