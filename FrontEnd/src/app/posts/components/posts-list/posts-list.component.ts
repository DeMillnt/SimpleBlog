import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PageResponse } from 'src/app/shared/models/page-response';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { PostModel } from '../../models/post-model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  pageRequest = new PageRequest();

  get posts(): PostModel[] {
    return this._response?.content ?? [];
  }

  get total(): number {
    return this._response?.total ?? 0;
  }
  private _response?: PageResponse<PostModel>;

  constructor(private router: Router,
    private postService: PostService,
    public profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  createPost(): void {
    this.router.navigate(['/create-or-update-post']);
  }

  loadPosts(): void {
    this.postService.getPosts(new PageRequest()).subscribe(res => {
      this._response = res;
    });
  }

  redirectToPostDetail(postId: number): void {
    this.router.navigate(['/post-detail', postId]);
  }

  paginatorChanged($event: PageEvent): void {
    this.pageRequest.pageIndex = $event.pageIndex;
    this.pageRequest.pageSize = $event.pageSize;
    this.loadPosts();
  }

}
