import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Address } from './../models/address.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  private postAddressLen = 'http://localhost:8080/address/postlen';
  private postAddress = 'http://localhost:8080/address/postAddress';
  private getAddress = 'http://localhost:8080/address/getAllAddresses';
  private deleteAddress = 'http://localhost:8080/address/deleteAddress';

  public sendAddressLen(addressLen) 
  {
    console.log("\n Inside post address length"+addressLen);
    return this.http.post<Number>(this.postAddressLen, addressLen);
  }

  public createAddress(address) 
  {
    console.log("\n Inside create address:"+JSON.stringify(address));
    return this.http.post<Address>(this.postAddress, address);
  }

  public getAllActiveAddresses() {
    console.log(this.http.get<Address[]>(this.getAddress));
    return this.http.get<Address[]>(this.getAddress);
  }

  public delAddress(address)
  {
    console.log("\n Inside delete address"+address);
    return this.http.post<String>(this.deleteAddress,address);
  }
}
