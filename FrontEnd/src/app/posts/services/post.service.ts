import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/page-request';
import { PageResponse } from 'src/app/shared/models/page-response';
import { HttpService } from 'src/app/shared/services/http.service';
import { CreatePostModel } from '../models/create-post-model';
import { PostModel } from '../models/post-model';
import { UpdatePostModel } from '../models/update-post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _prefix = 'api/post/';

  constructor(private httpService: HttpService) { }

  createPost(createPostModel: CreatePostModel): Observable<void> {
    return this.httpService.post(this._prefix, createPostModel);
  }

  getPosts(pageRequest: PageRequest): Observable<PageResponse<PostModel>> {
    return this.httpService.get(`${this._prefix}?${this.httpService.getQueryString(pageRequest)}`);
  }

  getPost(postId: number): Observable<PostModel> {
    return this.httpService.get(`${this._prefix}post?postId=${postId}`);
  }

  updatePost(updatePostModel: UpdatePostModel): Observable<void> {
    return this.httpService.put(this._prefix, updatePostModel);
  }

  deletePost(postId: number): Observable<void> {
    return this.httpService.delete(`${this._prefix}?postId=${postId}`);
  }
}
