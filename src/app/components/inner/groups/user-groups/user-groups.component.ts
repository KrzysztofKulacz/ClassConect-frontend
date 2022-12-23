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
import {JoinGroupComponent} from "../join-group/join-group.component";
import {environment} from "../../../../../environments/environment";
import {UserGroupsService} from "./user-groups.service";
import {DeleteCardService} from "../groupcard/delete-card.service";

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {

  groups: Group[] = [];
  user: User;
  isUserGroup: boolean = true;
  randomPhotos: string [] = [
    'https://source.unsplash.com/odxB5oIG_iA/400x250',
    'https://source.unsplash.com/e-S-Pe2EmrE/400x250',
    'https://source.unsplash.com/RP6Ba_6U154/400x250',
    'https://source.unsplash.com/EAvS-4KnGrk/400x250',
    'https://source.unsplash.com/e-S-Pe2EmrE/400x250'

  ]

  constructor(private dialog: MatDialog,
              private router: Router,
              private userGroupsService: UserGroupsService,
              private authenticationService: AuthenticationService,
              private notifier: NotifierService,
              private addGroupService: AddGroupService,
              private deleteCardService: DeleteCardService,
              public authorizationService: AuthorizationService) {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.loadGroups();
  }

  ngOnInit(): void {
    this.refreshGroups();
    this.refreshAfterDelete();
  }

  openAddGroupDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openJoinGroupDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(JoinGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewGroup(group: Group) {
    this.router.navigateByUrl(environment.path.inner.viewgroup)
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

    groupsResponse.forEach(group => {
      group.mainImageUrl = this.loadRandomPicture();
    })
    this.groups = groupsResponse;

  }

  private refreshGroups() {

    this.addGroupService.groupPusher.subscribe({
      next: (newGroup: Group) => {
        newGroup.mainImageUrl = this.loadRandomPicture()
        this.groups.push(newGroup)
      }
    })

  }

  private refreshAfterDelete() {

    this.deleteCardService.groupRemover.subscribe({
      next: (deletedGroup: Group) => {
        this.groups = this.groups.filter(value => value.groupId !== deletedGroup.groupId)
      }
    })

  }

  private loadRandomPicture() {
    return this.randomPhotos[Math.floor(Math.random() * this.randomPhotos.length)];
  }

}
