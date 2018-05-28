import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';


import Kategorija from "../../model/kategorija";
import KategorijeService from "../../services/kategorije.service";
import Product from '../../model/product';

import {AddProductService} from '../../services/productservices/addproductservice';




@Component({
  selector: 'addproduct',
  templateUrl: `./addproduct.html`
})

export default class AddProductComponent {

  categories: Kategorija[] = [];

  addProductForm = new FormGroup({
    ime: new FormControl(),
    cena: new FormControl(),
    opis: new FormControl(),
    kategorija_proivoda_id: new FormControl(),
  });


  constructor(

    private http: Http,
    private router: Router,
    private kategorijeService: KategorijeService,
    private addProductService: AddProductService

  ) {
    // if (!localStorage.getItem('token') && this.username! =='admin') {
    //   this.router.navigate(['/']);
    // }
    this.getAllCategories();

  }

  // HTTP poziva za dohvatanje svih kategorija 
  private getAllCategories(): void {
    this.kategorijeService.getKategorije().subscribe(data => {

      this.categories = data;
      // Setovanje prve kategorije da bude vidljiva u formi
      if (this.categories[0]['ID']) {
        this.addProductForm.controls['kategorija_proivoda_id'].setValue(
          this.categories[0]['ID']
        );
      }
      console.log(this.categories);
    });
  }

  //HTTP POST POZIV ZA UNOS NOVOG PROIZVODA U BAZU PODATAKA
  private addNewProduct(product: Product) {
    // Ispisujemo u konzoli da podatke iz forme
    console.log(product);
    this.addProductService.callService(product).subscribe(
      res => {
        // AKo je sve proslo kako treba resetujemo formu
        if(res['success'] && res['success'] ==='ok') {
          this.addProductForm.reset();
          alert('Uspesno ste dodali novi proizvod.');
        }
      }
    );
  }

}
