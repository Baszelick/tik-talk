import { Component, input } from '@angular/core';
import { PostComment } from '../../data';
import {AvatarCircleComponent, TimeAgoPipe} from '@tt/common-ui';


@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
