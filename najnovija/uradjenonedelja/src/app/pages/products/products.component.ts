import { Component } from '@angular/core';
import 'rxjs/Rx';
import { FormGroup, FormControl } from '@angular/forms';
import Product from "../../model/product";
import Order from '../../model/order';
import { GetProductsService } from '../../services/productservices/getproductsservice';
import { AddOrderService } from '../../services/productservices/neworder';
import { DeleteProductService } from '../../services/productservices/deleteproduct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: `./products.html`,
})

export default class ProductsComponent {

  products: Product[];

  username: string;

  selectProductId: string;
  newOrder: Order;

  constructor(
    private productsService: GetProductsService,
    private newOrderService: AddOrderService,
    private deleteProductService: DeleteProductService,
    private router: Router
  ) {

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    } else if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      console.log(this.username);
    }

    var $: any;
    this.productsService.getServices().subscribe(data => {
      console.log(data);
      this.products = data;
      setInterval(function () {
        $ = window['jQuery'];
        $('table').DataTable();
      }.bind(this), 400);
    });
  }

  odaberiProizvod(pro: any) {
    this.selectProductId = pro;
  }

  naruciProizvod(proizvod: any) {
    console.log(this.selectProductId);

    this.newOrder = new Order();
    this.newOrder.productId = parseInt(this.selectProductId);

    this.newOrderService.callService(this.newOrder)
      .subscribe(res => {
        // AKo je sve proslo kako treba resetujemo podatke
        if (res['success'] && res['success'] === 'ok') {
          this.newOrder = null;
          this.selectProductId = null;
          alert('Uspesno ste dodali novi proizvod.');
        }
      }
      );
  }

  private deleteProduct(product: any) {
    console.log(product);
    const obrisati = { 'ID': product.ID }
    console.log(obrisati);
    this.deleteProductService.callService(obrisati)
      .subscribe(res => {
        if (res['success']) {
          // Nadjemo index elementa koji brisemo i uklonimo ga iz niza
          let index = this.products.indexOf(product);
          if (index > -1) {
            this.products.splice(index, 1);
          }
        }
      });
  }


}
