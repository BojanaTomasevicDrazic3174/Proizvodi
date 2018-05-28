import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Router} from '@angular/router';
import {AddCategoryService} from "../../services/addcategory.service";
import Kategorija from "../../model/kategorija";

@Component({
  selector: 'addcategory',
  templateUrl: `./addcategory.html`
})

export default class AddCategoryComponent {

  addCategoryForm = new FormGroup({
    ime: new FormControl(),
  });

  constructor( private http: Http,private router: Router,private addCategoryService: AddCategoryService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  addCategory(model: Kategorija) {
    this.addCategoryService.callService(model).subscribe(data => {
      this.router.navigate(['/categories']);
    });

  }

}
