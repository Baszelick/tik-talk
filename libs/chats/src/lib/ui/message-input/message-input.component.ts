import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';
import { GlobalStoreService } from '@tt/shared';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(GlobalStoreService).me;

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
