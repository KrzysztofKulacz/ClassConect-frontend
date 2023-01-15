import {Component, OnInit} from '@angular/core';
import {SearchGroupRequest} from "./search-group-request";
import {SearchGroupService} from "./search-group.service";
import {Group} from "../group";
import {NotifierService} from "angular-notifier";
import {AddGroupService} from "../add-group/add-group.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-join-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.css']
})
export class SearchGroupComponent implements OnInit {

  constructor(private joinGroupService: SearchGroupService,
              private notifier: NotifierService,
              private addGroupService: AddGroupService) {
  }

  ngOnInit(): void {
  }

  onJoinGroup(joinGroupRequest: SearchGroupRequest) {
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
