import {Component, OnInit} from '@angular/core';
import {JoinGroupRequest} from "./join-group-request";
import {JoinGroupService} from "./join-group.service";
import {Group} from "../group";
import {NotifierService} from "angular-notifier";
import {AddGroupService} from "../add-group/add-group.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {

  constructor(private joinGroupService: JoinGroupService,
              private notifier: NotifierService,
              private addGroupService: AddGroupService) {
  }

  ngOnInit(): void {
  }

  onJoinGroup(joinGroupRequest: JoinGroupRequest) {
    this.joinGroupService.joinGroup(joinGroupRequest).subscribe({
      next: (group: Group) => {
        this.notifier.notify('success', "Dołączenie do grupy udane")
        this.addGroupService.groupPusher.next(group)
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        if (httpErrorResponse.error !instanceof String) {
          this.notifier.notify('error', "Wystąpił błąd dołączenia do grupy - spróbuj ponownie później")
        } else {
          this.notifier.notify('error', httpErrorResponse.error)
        }
      }
    })
  }
}
