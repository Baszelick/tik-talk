import { Component, input } from '@angular/core';
import { Profile } from '../../../../../../../interfaces/src/lib/profile/profile.interface';
import { AvatarCircleComponent } from '../../../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
