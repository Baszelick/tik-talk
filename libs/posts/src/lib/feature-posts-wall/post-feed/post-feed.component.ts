import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {GlobalStoreService} from '@tt/shared';
import {PostService} from '../../data';
import {Debounce} from '../../decorators/debounce.decorator';
import {PostInputComponent} from '../../ui';
import { PostComponent } from '../post/post.component';
import {Store} from '@ngrx/store';
import {postActions} from '../../data/store/actions';
import {selectAllPosts} from '../../data/store/selectors';



@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  store = inject(Store);
  profile = inject(GlobalStoreService).me;
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  feed = this.store.selectSignal(selectAllPosts);

  @HostListener('window:resize')
  @Debounce(300)
  onWindowResize() {
    this.resizeFeed();
  }


  ngOnInit() {
    this.store.dispatch(postActions.featurePosts({}));

    setTimeout(() => console.log('Текущие посты в ленте:', this.feed()), 1000)
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    firstValueFrom(
      this.postService.createPost({
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {
      postText = '';
      this.store.dispatch(postActions.featurePosts({}));
    });
  }
}
