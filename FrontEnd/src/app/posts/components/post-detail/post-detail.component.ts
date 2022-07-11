import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { PostModel } from '../../models/post-model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  postId: number = 0;
  post: PostModel = {} as PostModel;

  constructor(public profileService: ProfileService,
    private router: Router,
    activatedRoute: ActivatedRoute,
    postService: PostService) {
    activatedRoute.params.subscribe(param => {
      this.postId = +param['id'];
      postService.getPost(this.postId).subscribe(res => {
        this.post = res;
      });
    });
  }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
