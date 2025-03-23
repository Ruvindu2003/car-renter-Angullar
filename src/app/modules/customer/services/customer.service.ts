import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = ['http://localhost:8080/'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllCars():Observable<any>{
    return this.http.get(baseUrl + "api/customer/getAll");
}

getCarById(id:number):Observable<any>{
  return this.http.get(baseUrl + "api/customer/Search-By-Id/"+id);

}

bookACar(id:number,bookcarDto:any):Observable<any>{
  return this.http.post(baseUrl + "api/customer/Book-Car/"+id,bookcarDto);

}




}
