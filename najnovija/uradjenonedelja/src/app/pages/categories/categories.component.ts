import { Component} from '@angular/core';
import 'rxjs/Rx';
import Kategorija from "../../model/kategorija";
import KategorijeService from "../../services/kategorije.service";

@Component({
  selector: 'categories',
  templateUrl: `./categories.html`,
})

export default class CategoriesComponent {

  categories: Kategorija[];

  constructor( private kaegorijeService : KategorijeService ) {
    var $:any;
    this.kaegorijeService.getKategorije().subscribe(data => {
      this.categories = data;
      setInterval(function(){
        $ = window['jQuery'];
        $('table').DataTable();
      }.bind(this),400);
    });
  }


}
