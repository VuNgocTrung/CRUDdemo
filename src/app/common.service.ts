import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpOptions: HttpClient) { }

  private API_URL_SERVER = "http://localhost:3004/customerModule";

  public getCustomer(text: string) {
    let params = new HttpParams()
                .set('q', text)
    return this.httpOptions.get(this.API_URL_SERVER, {params})
  }

  public getCustomerById(id) {
    return this.httpOptions.get(`${this.API_URL_SERVER}/${id}`)
  }

  public createCustomer(data: any) {
    return this.httpOptions.post(this.API_URL_SERVER, data)
  }

  public updateCustomer(data: any) {
    return this.httpOptions.put(`${this.API_URL_SERVER}/${data.dataId}`, data.value)
  }

  public deleteCustomerApi(data: any) {
    return this.httpOptions.delete(`${this.API_URL_SERVER}/${data.id}`)
  }

}
