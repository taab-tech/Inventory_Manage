import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] =[];
  postService: any;


  constructor(public postservice: PostService) { }

  ngOnInit(): void {
    this.postservice.getAll().subscribe((data: Post[]) =>{
this.posts = data;
console.log(this.posts);

    })
  }

  deletePost(id: Number){
    this.postService.delete(id).subscribe((res: any) => {
    this.postService = this.posts.filter(item => item.id!==id);
    console.log('Post Deleted successfully');
  })
  }
}
