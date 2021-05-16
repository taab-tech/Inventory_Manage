import { createComponent } from '@angular/compiler/src/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup;
  edit: boolean=true;
  // @ViewChild(createComponent,{static:true})
  // @Input() 

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['postId'];
    // this.postService.find(this.id).subscribe((data: Post)=>{
    //   this.post = data;
    // });
    // this.form = new FormGroup({
    //   title: new FormControl('', [Validators.required]),
    //   body: new FormControl(' ',[Validators.required])
    // });
  }
  get f() {
    return this.form.controls
  }
  submit(){
    console.log(this.form.value);
  this.postService.update(this.id, this.form.value).subscribe(res =>{
console.log('post updated successfully');
this.router.navigateByUrl('post/index');
  })
  }
}












