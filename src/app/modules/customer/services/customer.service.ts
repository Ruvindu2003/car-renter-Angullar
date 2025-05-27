import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../../../auth/services/storage/storage.service';
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

getCustomerBooking():Observable<any>{
return this.http.get(baseUrl + "api/customer/car/booking/"+StorageService.getUserId());
}

getWhatssapp(to:string ,text:string):Observable<any>{
  const message = {
    to: to.replace(/\D/g, ''), 
    content: { text }
  };

  return this.http.post(`${baseUrl}send`, message).pipe(
    catchError(error => {
    
      const errorMsg = error.error?.status?.description 
                     || error.message 
                     || 'Failed to send message';
      throw new Error(errorMsg);
    })
  );
}
}
