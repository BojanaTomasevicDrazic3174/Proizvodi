import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";

import PostService from "./post.service";
import {apiUrl, getAuthHeaders} from "../constants";
import {Observable} from "rxjs";

@Injectable()
export class GetCategoriesService extends PostService{

  url = apiUrl + 'getcategories.php';

  getServices(): Observable<any> {

    return this.http.get(this.url, {headers: this.headers})

    .map (this.extractData)

    ._catch(this.handleError);
  }



}
