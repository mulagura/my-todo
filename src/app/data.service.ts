import { Injectable } from '@angular/core';

import { Http,Response,Headers,RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  public getUrl:string = '/getItems';
  public postUrl:string = '/postItem';
  public putUrl:string = '/updateItem/';
  public deleteUrl:string = '/deleteItem/';

  constructor(private http:Http) { }

  getData(){

        return this.http.get(this.getUrl)
                 .map( (res:Response)=> res.json() );

  }

  postData(data){

    console.log("in post service file");
    console.log(data);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.postUrl, JSON.stringify(data),options)
                    .map((res:Response)=> res.json());

  }

  updateData(data){

    console.log("in update/put service file");
    console.log(data);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});

    return this.http.put(this.putUrl + data._id, JSON.stringify(data),options)
                    .map((res:Response)=> res.json());

  }

  deleteData(data){

    console.log("inside del service");
    console.log(data);

    return this.http.delete( this.deleteUrl + data._id )
                    .map((res:Response)=> res.json());

  }

}
