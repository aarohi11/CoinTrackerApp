import { TransactionService } from './../../services/transaction.service';
import { Transaction } from './../../models/transaction.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { Address } from './../../models/address.model';
import { AddressService } from './../../services/address.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  transactionForm: FormGroup;
  submitted = false;
  submittedTranscation = false;
  address: Address = new Address();
  transaction: Transaction = new Transaction();
  addressLen: Number;
  addresses: Address[];
  addressHex: string;
  balance: Number;
  submitsuccessful:boolean;
  submitfailed: boolean;

  constructor(private addressService: AddressService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

    open(content, address) {
      console.log("Open:"+content);
      sessionStorage.setItem("addressHex", address.addressHex);
      this.addressHex = address.addressHex;
      this.balance = address.balance;
      console.log("Address Hex:"+this.addressHex);
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        //this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  ngOnInit(): void {
    this.submitsuccessful = false;
    this.submitfailed = false;
    this.addressForm = this.formBuilder.group({
      addressLen: ['', Validators.required],
      balance: ['', Validators.required]
      });

    this.transactionForm = this.formBuilder.group({
      recieverAddress: ['', Validators.required],
      amountSent: ['', Validators.required],
      transactionFee: ['', Validators.required]
    });

    this.addressService.getAllActiveAddresses().subscribe( data => {
      this.addresses = data;
      console.log("Inside get addresses:"+JSON.stringify(this.addresses));
    });
  }

  get f() { return this.addressForm.controls; }

  get g() { return this.transactionForm.controls; }

  viewaddress(address){
    sessionStorage.setItem("Address",JSON.stringify(address));
    this.router.navigate(['/addressview']);
  }

  deleteAddress(address){
    this.addressService.delAddress(address)
      .subscribe( data => {
        alert("Address deleted successfully.");
      });
  }

  onSubmit(){
    this.submitted = true;
    this.addressLen = JSON.parse(this.addressForm.get("addressLen")!.value);
    this.address.balance = JSON.parse(this.addressForm.get("balance")!.value);
    this.address.amountSent = 0;
    this.address.amountRecieved = 0;
    this.address.archiveStatus = 1;

    this.addressService.sendAddressLen(this.addressLen)
    .subscribe( data => {
      console.log("Data:"+JSON.stringify(data));
      console.log("Address generated successfully.");
    });

    this.addressService.createAddress(this.address)
    .subscribe( data => {
      console.log("Data:"+JSON.stringify(data));
      this.address = data;
      console.log("Address generated successfully.");
    });
  }

  onSubmitTransaction(){
    this.submittedTranscation = true;
    console.log("Balance:"+this.balance);
    if(JSON.parse(this.transactionForm.get("amountSent")!.value) > this.balance){
      this.submitfailed = true;
    }
    this.transaction.amountRecieved = JSON.parse(this.transactionForm.get("amountSent")!.value);
    this.transaction.archiveStatus = 1;
    this.transaction.senderAddress = this.addressHex;
    console.log("Sender Address:"+this.transaction.senderAddress);

    if(!this.submitfailed){
      this.transactionService.createTransaction(this.transaction)
      .subscribe( data => {
        console.log("Data:"+JSON.stringify(data));
        this.transaction = data;
        console.log("Transaction completed successfully.");
        this.submitsuccessful = true;
      });
    }
  }

}
