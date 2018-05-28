import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {apiUrl, getAuthHeaders} from "../constants";
import Kategorija from "../model/kategorija";

@Injectable()
export default class KategorijeService {
  protected url = apiUrl + "getcategory.php";

  constructor (protected http: Http) {}

  getKategorije(): Observable<Kategorija[]> {
    return this.http.get(this.url, {headers: getAuthHeaders() })
      .map(this.extractData)
  }
  protected extractData(data: Response) {
    console.log(data);
    let obj = JSON.parse(data['_body']);
    return obj.kategorije;
  }


}
