import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../../../../common-ui/src/lib/components/svg-icon/svg-icon.component';
import { ProfileService } from '../../../../../profile/src/lib/data/services/profile.service';

@Component({
  selector: 'app-message-input',
  imports: [
    AvatarCircleComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    FormsModule,
  ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  @Output() created = new EventEmitter<string>();

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost(): void {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}
