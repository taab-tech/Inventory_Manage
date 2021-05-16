import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {  FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  takeWhile } from 'rxjs/operators';
import { Items } from 'src/app/models/items.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  // itemName!: string;
  // url = `http://httpbin.org/post`;
  selected = {
    itemName: null,
    itemCode: null,
    description: null,
    purchaseAmnt: null,
    sellAmnt: null,
  }
  @Input() check: any;
  @Output() changeEditFlag= new EventEmitter<boolean>();
  @ViewChild("custForm", { static: true })
  formValidate!: NgForm;
  @Input() edit!: boolean
  @Input() editFlag!: boolean
  items: Items = new Items();
  view: any
  private alive: boolean = true;
  constructor(
    public postService: PostService,
    private router: Router, private http: HttpClient
  ) {

    //  this.items=this.postService.editItems
    // this.postService.editItems$.pipe(takeWhile(res=>this.getss(res))).subscribe(res => {

    //   console.log(this.view)
    //     this.ngOnInit();
    // })
    // this.view = this.postService.editItems$;

    // this.items.itemName = 'shirt'; 

  }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   title: new FormControl('', Validators.required),
    //   body: new FormControl('', Validators.required),
    // });
    // this.editComponent()
    if (this.editFlag) {
      this.items = this.check;
    }
  }
  loadView() {
    this.router.navigateByUrl('/post/view')
    this.changeEditFlag.emit(false);

  }
  
  update() {
    const index = this.postService.items.findIndex(f => f.index === this.items.index)
    this.postService.items[index] = this.items;
    this.postService.showMessage("Item updated successfully")
  }
  editComponent() {
    if (this.edit) {
      //  this.items=this.postService.editItems
      this.postService.editItems$.pipe(takeWhile(() => this.alive)).subscribe(res => {
        this.items = res;
      })
    }
  }
  reload() {
    this.items = new Items()
    // if (this.formValidate.valid) {
    //   this.formValidate.reset();
      this.formValidate.reset()
    // }
    //   for (let name in this.formValidate.controls) {
    //     this.formValidate.controls[name]=RequiredValidator();
    //  }
    //   Object.keys(this.formValidate.controls).forEach(key =>{
    //     this.formValidate.controls[key].setErrors(null)
    //  });
    // this.items = new Items();

  }
  submit() {
    //  console.log(this.form.value);
    //  this.postService.create(this.items).subscribe(res => {
    //    console.log('post created successfully');
    //    this.router.navigateByUrl('');
    //  })
    //  this.http.post(this.url, this.itemName).toPromise().then(data => {
    //    console.log(data);
    //  })
    if (!this.formValidate.valid) {
      for (let i in this.formValidate.controls) {
        if (this.formValidate.controls[i].untouched) {
          this.formValidate.controls[i].markAsTouched();
        }
      }
    }
    else {
      // this.postService.items.findIndex()
      this.items.index += this.postService.items.slice(-1)[0].index
      this.postService.items.push(this.items);
      this.postService.showMessage("Item created successfully") 

    }
    // console.log('post created successfully');
    // this.router.navigateByUrl('');

  }


}
