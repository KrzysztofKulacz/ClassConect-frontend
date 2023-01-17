import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {ConfirmationModalService} from "./confirmation-modal.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {SearchGroupService} from "../../groups/search-group/search-group.service";
import {AddGroupService} from "../../groups/add-group/add-group.service";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {Router} from "@angular/router";
import {ViewGroupService} from "../../groups/view-group/view-group.service";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  public parentComponentData: any


  constructor(private _ngZone: NgZone,
              private notifier: NotifierService,
              @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.parentComponentData = data;
  }

  ngOnInit(): void {
  }

}
