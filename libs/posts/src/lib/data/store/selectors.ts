import {createSelector} from '@ngrx/store';
import {postFeature} from './reducer';

export const selectAllPosts = createSelector(
  postFeature.selectPosts,
  (posts) => posts
)
