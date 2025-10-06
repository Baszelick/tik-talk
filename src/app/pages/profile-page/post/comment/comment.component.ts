import {Component, input} from '@angular/core';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {PostComment} from '../../../../data/interfaces/post.interface';
import {TimeAgoPipe} from '../../../../helpers/pipes/time-ago.pipe';

@Component({
  selector: 'app-comment',
  imports: [
    AvatarCircleComponent,
    TimeAgoPipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<PostComment>()
}
