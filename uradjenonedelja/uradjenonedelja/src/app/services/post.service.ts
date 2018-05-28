import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import {Injectable} from "@angular/core";

import {Http, Response} from "@angular/http";
import {apiUrl, prepareFormData, defaultPostHeaders, parseErrorToAlert} from "../constants";

// E ovo je servis
@Injectable()

export default class PostService {
  
  protected url = apiUrl; //localhost/getCAtegories;
  protected headers = defaultPostHeaders; //Koje vrsta podataka ide;

  constructor (protected http: Http) {}

  //http.get -> $.ajax{tyr:post}
  //http.post


  callService(item: Object): Observable<void> {
    let data = prepareFormData(item);
    console.log(data);
    console.log(this.url);
    //Post
    return this.http.post(this.url, data, {headers: this.headers}) //Ove ode na server
      
      .map(this.extractData)  //Ako je odgovor servaera OK

      .catch(this.handleError); //Ako postoji greska
  }

   protected extractData(res: Response) {
    let obj = JSON.parse(res['_body']);
    return obj;
  }

  protected handleError (error: Response | any) {
    parseErrorToAlert(error);
    return Observable.throw("Error");
  }
}
