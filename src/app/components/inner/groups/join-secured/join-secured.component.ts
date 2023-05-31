import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {PostService} from "../view-group/post/post.service";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SearchGroupRequest} from "../search-group/search-group-request";
import {SearchGroupService} from "../search-group/search-group.service";
import {AddGroupService} from "../add-group/add-group.service";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";
import {ViewGroupService} from "../view-group/view-group.service";
import {Group} from "../group";
import {environment} from "../../../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-join-secured',
  templateUrl: './join-secured.component.html',
  styleUrls: ['./join-secured.component.css']
})
export class JoinSecuredComponent implements OnInit {

  public parentComponentData: any


  constructor(private _ngZone: NgZone,
              private notifier: NotifierService,
              @Inject(MAT_DIALOG_DATA) data: any,
              private joinGroupService: SearchGroupService,
              private addGroupService: AddGroupService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private viewGroupService: ViewGroupService,
  ) {
    this.parentComponentData = data;
  }

  ngOnInit(): void {
  }

  onJoinSecuredGroup(joinGroupRequest: SearchGroupRequest) {

    joinGroupRequest.groupName = this.parentComponentData.group.title

    this.joinGroupService.joinGroup(joinGroupRequest).subscribe({
      next: (group: Group) => {
        this.notifier.notify('success', "Dołączenie do grupy udane")
        this.addGroupService.groupPusher.next(group)
        this.viewGroupService.setSelectedGroup(group);
        this.router.navigateByUrl(environment.path.inner.viewgroup);
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        if (httpErrorResponse.error ! instanceof String) {
          this.notifier.notify('error', "Wystąpił błąd dołączenia do grupy - spróbuj ponownie później")
        } else {
          this.notifier.notify('error', httpErrorResponse.error)
        }
      }
    })
  }
}
