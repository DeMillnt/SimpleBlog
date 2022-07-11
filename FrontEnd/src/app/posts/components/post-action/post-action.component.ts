import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-action',
  templateUrl: './post-action.component.html',
  styleUrls: ['./post-action.component.scss']
})
export class PostActionComponent implements OnInit {

  @Input() postId!: number;
  @Output() onRemoved = new EventEmitter();

  constructor(private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
  }

  editPost(): void {
    this.router.navigate(['/create-or-update-post', this.postId]);
  }

  removePost(): void {
    this.postService.deletePost(this.postId).subscribe(() => {
      this.onRemoved.emit();
    });
  }

}
