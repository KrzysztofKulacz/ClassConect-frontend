import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../group';
import {AuthorizationService} from "../../../authorization/authorization.service";
import {DeleteGroupService} from "./delete-group.service";
import {NotifierService} from "angular-notifier";
import {Subject} from "../../../domain/subject";

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
              private deleteGroupService: DeleteGroupService,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
  }


  public canDisplayDelete(): boolean {
    return this.authorizationService.canDeleteGroup(this.group.groupAdmin) && this.isUserGroup;
  }

  public deleteGroup(groupId: string) {
    this.deleteGroupService.deleteGroup(groupId).subscribe({
      next: ()=>{
        this.notifierService.notify("success",`Grupa ${this.group.title} usunięta`)
        this.deleteGroupService.groupRemover.next(this.group)
      }
    });
  }

  public isSecured(): boolean{
    return Boolean(this.group.password);
  }
}
