import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWorkspaceMessageComponent } from './chat-workspace-message.component';

describe('ChatWorkspaceMessageComponent', () => {
  let component: ChatWorkspaceMessageComponent;
  let fixture: ComponentFixture<ChatWorkspaceMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWorkspaceMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWorkspaceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
