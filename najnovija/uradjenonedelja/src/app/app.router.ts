

import { Routes } from '@angular/router';

// STRANICE

import HomeComponent from "./pages/home/home.component";
import RegisterComponent from "./pages/register/register.component";
import LoginComponent from "./pages/login/login.component";
import AddCategoryComponent from "./pages/addcategory/addcategory.component";
import CategoriesComponent from "./pages/categories/categories.component";
import AddProductComponent from "./pages/addproduct/addproduct.component";
import ProductsComponent from './pages/products/products.component';
// Importujemo komponentu koju smo kreirali
import OrdersComponent from './pages/orders/orders.component'

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addcategory', component: AddCategoryComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'products', component: ProductsComponent },
  // Zadajemo ime za rutiranje po kojoj ce ruter da prozove komponentu
  { path: 'orders', component: OrdersComponent },
];
