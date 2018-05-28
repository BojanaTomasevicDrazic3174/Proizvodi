import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import PostService from "../post.service";
import {apiUrl, getAuthHeaders} from "../../constants";
import {Observable} from "rxjs";
import Product from '../../model/product';

@Injectable()
export class GetProductsService {

  url = apiUrl + 'getProducts.php';
  
  constructor (protected http: Http) {}


  getServices(): Observable<Product[]> {
    return this.http.get(this.url, {headers: getAuthHeaders() })
    .map(res => this.extractData(res))
  }

  protected extractData(res: Response) {
    console.log(res);
    let obj = JSON.parse(res['_body']);
    console.log(obj);
    return obj.products;
  }



}
