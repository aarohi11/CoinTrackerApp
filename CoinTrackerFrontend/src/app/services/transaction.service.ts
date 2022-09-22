import { Transaction } from './../models/transaction.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  private postTransaction = 'http://localhost:8080/transaction/postTransaction';
  private getAllTransactions = 'http://localhost:8080/transaction/getAllTransactions';

  public createTransaction(transaction) 
  {
    console.log("\n Inside create transaction:"+JSON.stringify(transaction));
    return this.http.post<Transaction>(this.postTransaction, transaction);
  }

  public getTransactionByAddress(address)
  {
    this.getAllTransactions = this.getAllTransactions + "/"+ address;
    return this.http.get<Transaction[]>(this.getAllTransactions);
  }
}
