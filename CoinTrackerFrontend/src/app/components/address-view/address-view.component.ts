import { Transaction } from './../../models/transaction.model';
import { Address } from './../../models/address.model';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.css']
})
export class AddressViewComponent implements OnInit {
  address: Address;
  transactions: Transaction[];

  constructor(private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.address = JSON.parse(sessionStorage.getItem("Address") || '{}');
    console.log("Address recieved:"+JSON.stringify(this.address));
    this.transactionService.getTransactionByAddress(this.address.addressHex).subscribe( data => 
      {
          this.transactions = data; 
          console.log("All Transactions fetched by address:"+JSON.stringify(this.transactions));
     });
  }

  viewaddress(address){
    alert("Inside view address:"+JSON.stringify(address));
    sessionStorage.setItem("Address",JSON.stringify(address));
    this.router.navigate(['/addressview']).then(addressview => { window.location.reload(); });
  }

}
