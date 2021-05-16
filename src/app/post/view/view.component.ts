import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items.model';
import { CreateComponent } from '../create/create.component';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: number = 101;
  post!: Post;
  viewItems: Items[] = new Array<Items>();
  dataSource: any;
  editFlag: boolean = false;
  displayedColumns: string[] = ['name', 'no', 'description', 'purchase', 'selling', 'actions']
 
  check: any;
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.gridValue()
  }
  gridValue() {
    this.viewItems = this.postService.items
    this.dataSource = this.viewItems
  }
  delete(element: any) {
    console.log(element)
    this.postService.items = this.viewItems.filter(i => i !== element)
    this.gridValue();
  }
  edit(element: Items) {
    this.check = element;
    this.editFlag = true
    // this.read.items = element

    // this.postService.editItems.next(element)
    // this.router.navigateByUrl('post/edit');
  }
}
