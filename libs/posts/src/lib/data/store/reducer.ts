import {Post} from '../interfaces/post.interface';
import {createFeature, createReducer, on} from '@ngrx/store';
import {postActions} from './actions';

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [],
}

export const  postFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(postActions.postLoaded, (state, {posts}) => {
      return {
        ...state,
        posts
      }
    })
  )
})
