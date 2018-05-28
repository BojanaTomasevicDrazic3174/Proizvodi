import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import PostService from "../post.service";
import {apiUrl, getAuthHeaders} from "../../constants";
import {Observable} from "rxjs";
import Product from '../../model/product';

@Injectable()
export class GetOrdersService {

  url = apiUrl + 'getorder.php';
  
  constructor (protected http: Http) {}


  getServices(): Observable<Object> {
    // Poziv http requiest
    return this.http.get(this.url, {headers: getAuthHeaders() })
    //Transformaciju podataka sa servera u oblik koji nama odgovara
    .map(res => this.extractData(res))
  }

  protected extractData(res: Response) {
    let obj = JSON.parse(res['_body']);
    return obj.narudzbina;
  }



}