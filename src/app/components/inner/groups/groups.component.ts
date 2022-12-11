import {Component, OnInit} from '@angular/core';
import {Group} from "./group";
import {MatDialog} from "@angular/material/dialog";
import {AddGroupComponent} from "./add-group/add-group.component";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {GroupsService} from "./groups.service";
import {User} from "../../domain/user";
import {AuthenticationService} from "../../auth/authentication.service";
import {NotifierService} from "angular-notifier";
import {AddGroupService} from "./add-group/add-group.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];
  user: User;
  randomPhotos: string [] = [
    'https://source.unsplash.com/odxB5oIG_iA/400x250',
    'https://source.unsplash.com/e-S-Pe2EmrE/400x250',
    'https://source.unsplash.com/RP6Ba_6U154/400x250',
    'https://source.unsplash.com/EAvS-4KnGrk/400x250',
    'https://source.unsplash.com/e-S-Pe2EmrE/400x250'

  ]

  constructor(private dialog: MatDialog,
              private router: Router,
              private groupsService: GroupsService,
              private authenticationService: AuthenticationService,
              private notifier: NotifierService,
              private addGroupService: AddGroupService) {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.loadGroups();
  }

  ngOnInit(): void {
    this.refreshGroups()
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddGroupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewGroup(group: Group) {
    this.router.navigateByUrl(environment.path.inner.viewgroup)
  }

  private loadGroups() {

    this.groupsService.getGroups(this.user.email).subscribe({
      next: (groupsResponse: Group[]) => this.buildGroups(groupsResponse),
      error: err => {
        console.log(err)
        this.notifier.notify('error', "Wystąpił bład w trakcie ładowania grup - spróbuj później")
      }
    })

  }

  private buildGroups(groupsResponse: Group[]) {

    groupsResponse.forEach(group => {
      group.mainImageUrl = this.loadRandomPicture()
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

  private loadRandomPicture() {
    return this.randomPhotos[Math.floor(Math.random() * this.randomPhotos.length)];
  }
}
