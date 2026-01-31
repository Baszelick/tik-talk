import {inject, Injectable} from '@angular/core';
import {PostService} from '../services/post.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {postActions} from './actions';
import {map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)

  postLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.featurePosts),
      switchMap(() =>
      this.postService.fetchPosts().pipe(
        map((posts) => postActions.postLoaded({posts}))
      ))
    )
  })

}
