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

  chosenSubjects = new FormControl('');
  subjectsList = Object.values(Subject);
  subjectsKeys = Object.keys(Subject);

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
              public authorizationService: AuthorizationService) {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  ngOnInit(): void {
    this.loadAllGroups()
  }

  public enableAllGroups() {
    if (this.allGroupsCheck) {
      this.allGroupsCheck = true
      this.openGroupsCheck = false
      this.closedGroupsCheck = false
      this.nonUsersGroupsCheck = false
      this.chosenSubjects.reset()
    }
    this.filterGroups();
  }

  public enableFiltering() {
    if (this.allGroupsCheck) {
      this.allGroupsCheck = false
    }
    if (this.isAllFilterOff()) {
      this.allGroupsCheck = true;
    }
    this.filterGroups()
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
    this.allGroups = groupsResponse;
    this.filteredGroups = groupsResponse;
  }

  private loadRandomPicture() {
    return this.randomPhotos[Math.floor(Math.random() * this.randomPhotos.length)];
  }

  private isAllFilterOff(): boolean {
    return !this.openGroupsCheck && !this.closedGroupsCheck && !this.nonUsersGroupsCheck && (this.chosenSubjects.value?.length == 0)
  }


  private filterGroups() {
    let filterResult: Group[];
    if (this.allGroupsCheck) {
      filterResult = this.allGroups;
    } else {
      if (this.isAllFilterOn()) {
        filterResult = this.applyAllFilters();
      } else if (this.openGroupsCheck && this.closedGroupsCheck) {
        filterResult = this.filterByOpenAndClosed();
      } else if (this.openGroupsCheck && this.nonUsersGroupsCheck) {
        filterResult = this.filterByOpenAndNonUsers();
      } else if (this.openGroupsCheck) {
        filterResult = this.filterByOpen();
      } else if (this.closedGroupsCheck && this.nonUsersGroupsCheck) {
        filterResult = this.filterByClosedAndNonUsers();
      } else if (this.closedGroupsCheck) {
        filterResult = this.filterByClosed();
      } else if (this.nonUsersGroupsCheck) {
        filterResult = this.filterByNonUsers()
      } else {
        filterResult = this.allGroups
      }
    }

    this.filteredGroups = this.filterByChosenSubjects(filterResult);
  }

  private isAllFilterOn(): boolean {
    return this.openGroupsCheck && this.closedGroupsCheck && this.nonUsersGroupsCheck
  }

  private applyAllFilters(): Group[] {
    return this.allGroups.filter(group => group.groupAdmin !== this.user.userId && (!Boolean(group.password) || Boolean(group.password)))
  }

  private filterByOpenAndClosed(): Group[] {
    return this.allGroups.filter(group => !Boolean(group.password) || Boolean(group.password))
  }

  private filterByOpenAndNonUsers(): Group[] {
    return this.allGroups.filter(group => !Boolean(group.password) && group.groupAdmin !== this.user.userId)
  }

  private filterByOpen(): Group[] {
    return this.allGroups.filter(group => !Boolean(group.password))
  }

  private filterByClosedAndNonUsers(): Group[] {
    return this.allGroups.filter(group => Boolean(group.password) && group.groupAdmin !== this.user.userId)
  }

  private filterByClosed(): Group[] {
    return this.allGroups.filter(group => Boolean(group.password))
  }

  private filterByNonUsers(): Group[] {
    return this.allGroups.filter(group => group.groupAdmin !== this.user.userId)
  }

  private filterByChosenSubjects(filteredByToggle: Group[]): Group[] {
    let selectedSubjects: string[] = this.chosenSubjects.value as unknown as string[]
    let filteredBySubjects: Group[]

    if (selectedSubjects.length > 0) {
      filteredBySubjects = filteredByToggle.filter(group => selectedSubjects.indexOf(this.subjectsList[this.subjectsKeys.indexOf(group.subject)]) > -1)
    } else {
      filteredBySubjects = filteredByToggle
    }
    return filteredBySubjects;
  }
}
