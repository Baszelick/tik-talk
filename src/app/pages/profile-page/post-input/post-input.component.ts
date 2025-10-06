import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {NgIf} from '@angular/common';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {


  r2 = inject(Renderer2)
  postText = ''

  isCommentInput = input(false)
  postId = input<number>(0)

  @Output() created = new EventEmitter();

  onSend() {
    if(!this.postText.trim()) return

    this.created.emit(this.postText);
    this.postText = ''
  }


  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }



}
