import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { CustomerModel } from '../customer/customer';
import { itemsModel } from '../items/items';

@Component({
  selector: 'app-order',
  providers: [ApiService],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  customerData: any[] = [];
  formValue!: FormGroup;
  itemsValue!: FormGroup;
  CustomerModelObj: CustomerModel = new CustomerModel();
  itemsModelObj: itemsModel = new itemsModel();
  itemsData!: any;
  order!: FormArray;
  rowDefalut: any = { item: '', quantity: '', price: '', total: '' };
  total:any = '';

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  getAllCustomer() {
    this.api.getDataCustomer().subscribe((a) => {
      this.customerData = a;
    });
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      city: [''],
      email: [''],
      address: [''],
      phone: [''],
      order: this.formBuilder.array([]),
    });
    this.getAllCustomer();
    this.getAllItems();
    this.addRow();
  }

  addRow(): void {
    const data = Object.assign({}, this.rowDefalut);
    const control = <FormArray>this.formValue.get('order');
    control.push(this.addRule(data));
  }

  getRows() {
    const control = <FormArray>this.formValue.get('order');
    return control.controls;
  }

  addRule(r: any): FormGroup {
    return this.formBuilder.group({
      item: [r.item],
      quantity: [r.quantity],
      price: [r.price],
      total: [r.total],
    });
  }

  getAllItems() {
    this.api.getDataItems().subscribe((a) => {
      this.itemsData = a;
    });
  }
  deleteRow(index: number) {
    const control = <FormArray>this.formValue.get('order');
    control.removeAt(index);
    // this.calculateTotalAmount();
  }

  calculateTotalAmount(){
    const controls = <FormArray>this.formValue.get('order');
    let quantity = this.formValue.get('quantity')?.value;
    let price = this.formValue.get('quantity')?.value;
    controls.controls.forEach((control: any) => {
      quantity  = (Number(control.controls.quantity.value).toFixed(10) );
      price  = (Number(control.controls.price.value).toFixed(10));
    });

    let gtotal = (Number(quantity) * Number(price)).toFixed(10);;
    this.formValue.get("total")?.setValue(gtotal);
    console.log()

    
  
    // this.total = this.formValue.get('quantity')?.value * this.formValue.get('price')?.value;
    // console.log(this.total)
    
  }

  onSelectCustomer(event: any) {
    let row = this.customerData.find(
      (customer) => customer.id == event.target.value
    );
    this.CustomerModelObj.id = row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['phone'].setValue(row.phone);
  }

  onSelectItem(event: any, index:number) {
    const control = this.formValue.get('order')?.get([index]);
    let row = this.itemsData.find(
      (items: any) => items.id == event.target.value
    );
    control?.get('item')?.setValue(row.id);
    // control?.get('quantity')?.setValue(row.quantity);
    control?.get('price')?.setValue(row.price);
    this.calculateTotalAmount();
  }

  onChangeQuantity(event: any, index:number){
    const control = this.formValue.get('order')?.get([index]);
    let item = control?.value;

    let qnumber:any = event.target.value;
    let total = qnumber * item.price;
    control?.get('total')?.setValue(total);


  }




  // total: any = '';

  // value: any = {
  //   cake: 20,
  //   pastries: 10,
  //   sweets: 30,
  // };
  // getValue(val: any) {
  //   this.total = val * this.value;
  // }
}
