import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InviteService, User } from '../service/invite.service';
import { EventService } from '../service/event.service';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  private _success: Number[] = [];
  private _error: Number[] = [];
  private _existingUsers: User[] = [];

  constructor(
    private _inviteService: InviteService,
    private _router: Router,
    private eventService: EventService) {}

  ngOnInit(): void {
    this._inviteService.get().subscribe(data => {
      this._existingUsers = data;
    });
  }

  onSubmit(): void {
    users.map(async (user, index) => {
      const existingUsers = this._existingUsers.filter(us => user.email === us.email);
      if (existingUsers.length > 0) {
        this._error.push(index);
        this.eventService.broadcastEvent({ ...user, error: `${user.email} already exists!`, index: index + 1, type: 'error' });
      } else {
        await this._inviteService.invite(user).subscribe((data) => {
          this._success.push(index);
          this.handleCompleted();
        }, err => {
          this._error.push(index);
          this.eventService.broadcastEvent({ ...user, error: `${err.error} happened for ${user.email}`, index: index + 1, type: 'error' });
          this.handleCompleted();
        });
      }
    });
  }

  handleCompleted(): void  {
    if (users.length === (this._success.length + this._error.length)) {
      this.eventService.broadcastEvent({type: 'success', count: this._success.length});
      setTimeout(() => {
        this._router.navigate(['/list']);
      }, 1000);
    }
  }
}
