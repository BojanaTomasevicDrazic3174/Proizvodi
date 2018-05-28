
import {Headers} from "@angular/http";
export const apiUrl = "http://localhost:8080/cas/phpispit/";


export function prepareFormData(item: Object) : String{
  let result = "";
  // OVO JE JSON OBJEKAT
  let porudzbina = {
    'ID':1,
    'PRODUCT ID':2
  };


  // PRETVATA JSON U NIZ STRINGOVA
  Object.keys(item).forEach(key => {
    let append = (encodeURIComponent(key) + "=" + encodeURIComponent(item[key]));

    console.log(append);

    if(encodeURIComponent(item[key]) == "null"){
      append = encodeURIComponent(key) + "=";
    }
    result += (result == "") ? append : "&" + append;
    // resultat= "ID=1 & PRODUCT ID=2";
  });
  return result;
}

export const defaultPostHeaders = new Headers( {'Content-Type':'application/x-www-form-urlencoded'});

export function parseErrorToAlert(err: Object){
  let obj = JSON.parse(err['_body']);
  let element = <HTMLElement>document.getElementsByClassName('alert')[0];
  element.style.display = 'block';
  element.innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\"').join('');
}

export function getAuthHeaders() : Headers {
  return  new Headers( {'Content-Type':'application/x-www-form-urlencoded', 'token': localStorage.getItem('token')});
}
