import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePostModel } from '../../models/create-post-model';
import { UpdatePostModel } from '../../models/update-post-model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-or-update-post',
  templateUrl: './create-or-update-post.component.html',
  styleUrls: ['./create-or-update-post.component.scss']
})
export class CreateOrUpdatePostComponent implements OnInit {

  createFormGroup: FormGroup = {} as FormGroup;
  id: number = 0;
  get isUpdateMode(): boolean {
    return !!this.id;
  }

  constructor(
    private postService: PostService,
    private router: Router,
    activatedRoute: ActivatedRoute,
    formBuilder: FormBuilder) {
    this.createFormGroup = formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      id: 0
    });

    activatedRoute.params.subscribe(param => {
      let id = +param['id'];
      if (id) {
        this.id = id;
        this.postService.getPost(this.id).subscribe(res => {
          this.createFormGroup.patchValue(res);
        });
      }
    })
  }

  ngOnInit(): void {
  }

  send(): void {
    if (this.isUpdateMode) {
      this.update();
    } else {
      this.publish();
    }
  }

  publish(): void {
    let rawValue = this.createFormGroup.getRawValue();
    this.postService.createPost(rawValue as CreatePostModel).subscribe(() => {
      this.navigateToHome();
    });
  }

  update(): void {
    let rawValue = this.createFormGroup.getRawValue();
    this.postService.updatePost(rawValue as UpdatePostModel).subscribe(() => {
      this.navigateToHome();
    });
  }

  private navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
