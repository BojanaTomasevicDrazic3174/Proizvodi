
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import PostService from "../post.service";
import {apiUrl, getAuthHeaders} from "../../constants";
import {Observable} from "rxjs";

@Injectable()
export class RemoveFromOrderService extends PostService{
  url = apiUrl + 'deleteOrder.php';

  callService(item: Object) : Observable<void> {
    this.headers = getAuthHeaders();
    return super.callService(item);
  }
}
