import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../group';
import {AuthorizationService} from "../../../authorization/authorization.service";
import {CardGroupService} from "./card-group.service";
import {NotifierService} from "angular-notifier";
import {Subject} from "../../../domain/subject";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  group!: Group;

  @Input()
  isUserGroup!: boolean;

  subjectValues = Object.values(Subject);
  keysValues = Object.keys(Subject);

  constructor(private authorizationService: AuthorizationService,
              private authenticationService: AuthenticationService,
              private cardGroupService: CardGroupService,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
  }


  public canDisplayDelete(): boolean {
    return this.authorizationService.canDeleteGroup(this.group.groupAdmin) && this.isUserGroup;
  }

  public deleteGroup(groupId: string) {
    this.cardGroupService.deleteGroup(groupId).subscribe({
      next: () => {
        this.notifierService.notify("success", `Grupa ${this.group.title} usunięta`)
        this.cardGroupService.groupRemover.next(this.group)
      }
    });
  }

  public isSecured(): boolean {
    return Boolean(this.group.password);
  }

  public leaveGroup(groupId: string) {
    let loggedUserId = this.authenticationService.getUserFromLocalCache().userId;
    this.cardGroupService.removeUserFromGroup(groupId, loggedUserId).subscribe({
      next: (removedGroup: Group) => {
        this.notifierService.notify("success", `Opuszczono grupę ${this.group.title}`)
        this.cardGroupService.groupRemover.next(removedGroup)
      }
    })
  }
}
