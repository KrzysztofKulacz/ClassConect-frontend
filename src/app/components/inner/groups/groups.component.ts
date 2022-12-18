import {Component, OnInit} from '@angular/core';
import {Group} from "./group";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {GroupsService} from "./groups.service";
import {User} from "../../domain/user";
import {AuthenticationService} from "../../authentication/authentication.service";
import {NotifierService} from "angular-notifier";
import {AddGroupService} from "./add-group/add-group.service";
import {AuthorizationService} from "../../authorization/authorization.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];
  user: User;
  isUserGroup: boolean = false;

  //todo to one service
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
              private addGroupService: AddGroupService,
              public authorizationService: AuthorizationService) {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  ngOnInit(): void {
    this.loadAllGroups()
  }

  private loadAllGroups() {
    this.groupsService.getAllGroups().subscribe({
      next: (groups: Group[]) => this.buildGroups(groups),
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

  private loadRandomPicture() {
    return this.randomPhotos[Math.floor(Math.random() * this.randomPhotos.length)];
  }
}
