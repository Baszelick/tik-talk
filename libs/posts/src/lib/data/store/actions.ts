import {createActionGroup, props} from '@ngrx/store';
import {Post} from '../interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'posts',
  events: {
    'post loaded': props<{posts: Post[]}>(),
    'feature posts': props<{ page?: number }>(),
    'create post': props<{post: Post}>()
  }
})
