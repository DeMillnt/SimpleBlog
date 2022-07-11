import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CreateOrUpdatePostComponent } from './components/create-or-update-post/create-or-update-post.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { PostActionComponent } from './components/post-action/post-action.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'create-or-update-post/:id', component: CreateOrUpdatePostComponent },
  { path: 'create-or-update-post', component: CreateOrUpdatePostComponent },
  { path: 'post-detail/:id', component: PostDetailComponent }
]

@NgModule({
  declarations: [
    PostsListComponent,
    PostDetailComponent,
    CreateOrUpdatePostComponent,
    PostActionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class PostsModule { }
