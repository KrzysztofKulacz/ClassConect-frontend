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
import {ThemePalette} from "@angular/material/core";
import {FormControl} from '@angular/forms';
import {Subject} from "../../domain/subject";
import {group} from "@angular/animations";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  allGroups: Group[] = [];
  filteredGroups: Group[] = [];
  user: User;
  isUserGroup: boolean = false;
  color: ThemePalette = 'primary';

  allGroupsCheck: boolean = true;
  openGroupsCheck: boolean = false;
  closedGroupsCheck: boolean = false;
  nonUsersGroupsCheck: boolean = false;

  subjects = new FormControl('');
  subjectsList = Object.values(Subject)

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
      group.isOpen = !Boolean(group.password);
      group.isClosed = Boolean(group.password);
      group.isNonUser = group.groupAdmin !== this.user.userId
    })
    this.allGroups = groupsResponse;
    this.filteredGroups = groupsResponse;
  }

  private loadRandomPicture() {
    return this.randomPhotos[Math.floor(Math.random() * this.randomPhotos.length)];
  }


  public enableAllGroups() {
    if (this.allGroupsCheck) {
      this.allGroupsCheck = true
      this.openGroupsCheck = false
      this.closedGroupsCheck = false
      this.nonUsersGroupsCheck = false
      this.subjects.reset()
    }
    this.filterGroups();
  }

  public disableAllGroups() {
    this.allGroupsCheck = false
  }

  public toggleFilter() {
    if (this.allGroupsCheck) {
      this.allGroupsCheck = false
    }
    if (this.isAllFilterOff()) {
      this.allGroupsCheck = true;
    }
    this.filterGroups()
  }

  private isAllFilterOff(): boolean {
    return !this.openGroupsCheck && !this.closedGroupsCheck && !this.nonUsersGroupsCheck
  }

  private isAllFilterOn(): boolean {
    return this.openGroupsCheck && this.closedGroupsCheck && this.nonUsersGroupsCheck
  }

  private filterGroups() {
    let filterResult: Group[];
    if (this.allGroupsCheck) {
      //todo remove booleand from group interface
      filterResult = this.allGroups;
    } else {
      if (this.isAllFilterOn()){
        filterResult = this.allGroups.filter(group => group.groupAdmin !== this.user.userId && (!Boolean(group.password) || Boolean(group.password)))
      }
      else if (this.openGroupsCheck && this.closedGroupsCheck){
        filterResult = this.allGroups.filter(group => !Boolean(group.password) || Boolean(group.password))
      }else if (this.openGroupsCheck && this.nonUsersGroupsCheck){
        filterResult = this.allGroups.filter(group => !Boolean(group.password) && group.groupAdmin !== this.user.userId)
      } else if (this.openGroupsCheck){
        filterResult = this.allGroups.filter(group=> !Boolean(group.password))
      }

      else if (this.closedGroupsCheck && this.nonUsersGroupsCheck){
        filterResult = this.allGroups.filter(group => Boolean(group.password) && group.groupAdmin !== this.user.userId)
      }
      else if (this.openGroupsCheck && this.closedGroupsCheck ){
        // duplicate
        filterResult = this.allGroups.filter(group => Boolean(group.password) || !Boolean(group.password))
      }
      else if (this.closedGroupsCheck){
        filterResult = this.allGroups.filter(group => Boolean(group.password))
      }



      else if (this.nonUsersGroupsCheck && this.openGroupsCheck) {
        filterResult = this.allGroups.filter(group => group.groupAdmin !== this.user.userId && !Boolean(group.password))
      }
      else if (this.closedGroupsCheck && this.nonUsersGroupsCheck) {
        //duplicate
        filterResult = this.allGroups.filter(group => group.groupAdmin !== this.user.userId && Boolean(group.password))
      } else if (this.nonUsersGroupsCheck) {
        filterResult = this.allGroups.filter(group => group.groupAdmin !== this.user.userId)
      } else {
        filterResult = []

      }

    }

    this.filteredGroups = filterResult;
  }

  // private filterByOpenGroups(): Group[] {
  //   if (this.openGroupsCheck) {
  //     return this.allGroups.filter(group => !Boolean(group.password));
  //   }
  //   return [];
  // }
  //
  // private filterByClosedGroups(): Group[] {
  //   if (this.closedGroupsCheck) {
  //     return this.allGroups.filter(group => Boolean(group.password));
  //   }
  //   return [];
  // }
  //
  // private filterByNonUserGroups(): Group[] {
  //   if (this.nonUsersGroupsCheck) {
  //     return this.allGroups.filter(group => group.groupAdmin !== this.user.userId)
  //   }
  //   return [];
  // }
}
