import { Component } from '@angular/core';
import 'rxjs/Rx';
import { FormGroup, FormControl } from '@angular/forms';
import Product from "../../model/product";
import Order from '../../model/order';
import { Router} from '@angular/router';

//Importujemo Servis za dohvatanje podataka sa servera
import { GetOrdersService } from '../../services/ordersservices/getorders.service';
import { RemoveFromOrderService } from '../../services/ordersservices/removefromorder.service';

this.orders = [{}];

@Component({
  selector: 'orderss',
  templateUrl: `./orders.html`,
})

export default class OrdersComponent {

  private orders: any;

  //Servisi se uvek dodaju u konstruktor klase kao private
  constructor(private getOrdersService: GetOrdersService,
    private removeFromOrderService: RemoveFromOrderService,
    private router : Router
  ) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }

    var $: any;
    // Pozivamo metodu iz servisa i da bismo videli rezultate sa servera moramo da se SUBSCIRE
    this.getOrdersService.getServices()
      .subscribe(res => {

        this.orders = res;

        console.log(this.orders); //Prikazala u konzoli rezultat

        setInterval(function () {
          $ = window['jQuery'];
          $('table').DataTable();
        }.bind(this), 400);
      });

  }

  private removeProduct(order: any) {
    console.log(order);
    let obrisati = {
      ID: order.ID,
      PROIZVOD_ID: order.PROIZVOD_ID
    }

    this.removeFromOrderService.callService(obrisati)
      .subscribe(
      // Ako je uspesno obrisan u bazi treba da obrisemo i na frontu
      res => {
        // console.log(res); Prikazemo rezultat sa servera
        console.log(res);
        if (res['success']) {
          // Nadjemo index elementa koji brisemo i uklonimo ga iz niza
          let index = this.orders.indexOf(order);
          if (index > -1) {
            this.orders.splice(index, 1);
          }
        }
      }
      );

  }

}
