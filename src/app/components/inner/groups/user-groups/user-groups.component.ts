import {Component, OnInit} from '@angular/core';
import {Group} from "../group";
import {User} from "../../../domain/user";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {NotifierService} from "angular-notifier";
import {AddGroupService} from "../add-group/add-group.service";
import {AuthorizationService} from "../../../authorization/authorization.service";
import {AddGroupComponent} from "../add-group/add-group.component";
import {SearchGroupComponent} from "../search-group/search-group.component";
import {environment} from "../../../../../environments/environment";
import {UserGroupsService} from "./user-groups.service";
import {CardGroupService} from "../groupcard/card-group.service";
import {ViewGroupService} from "../view-group/view-group.service";

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {

  groups: Group[] = [];
  user: User;
  isUserGroup: boolean = true;

  constructor(private dialog: MatDialog,
              private router: Router,
              private userGroupsService: UserGroupsService,
              private authenticationService: AuthenticationService,
              private notifier: NotifierService,
              private addGroupService: AddGroupService,
              private deleteCardService: CardGroupService,
              private viewGroupService: ViewGroupService,
              public authorizationService: AuthorizationService,) {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.loadGroups();
  }

  ngOnInit(): void {
    this.refreshGroups();
    this.refreshAfterRemove();
  }

  openAddGroupDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openJoinGroupDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SearchGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewGroup(group: Group) {
    this.viewGroupService.setSelectedGroup(group);
    this.router.navigateByUrl(environment.path.inner.viewgroup);
  }

  private loadGroups() {

    this.userGroupsService.getUserGroups(this.user.email).subscribe({
      next: (groupsResponse: Group[]) => this.buildGroups(groupsResponse),
      error: err => {
        console.log(err)
        this.notifier.notify('error', "Wystąpił bład w trakcie ładowania grup - spróbuj później")
      }
    })

  }

  private buildGroups(groupsResponse: Group[]) {
    this.groups = groupsResponse;
  }

  private refreshGroups() {

    this.addGroupService.groupPusher.subscribe({
      next: (newGroup: Group) => {
        this.groups.push(newGroup)
      }
    })

  }

  private refreshAfterRemove() {
    this.deleteCardService.groupRemover.subscribe({
      next: (removedGroup: Group) => {
        this.groups = this.groups.filter(value => value.groupId !== removedGroup.groupId)
      }
    })
  }

}
