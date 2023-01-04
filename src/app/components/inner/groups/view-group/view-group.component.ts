import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddPostComponent} from "./add-post/add-post.component";
import {ViewGroupService} from "./view-group.service";
import {Group} from "../group";

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {

  public selectedGroup!: Group

  constructor(private dialog: MatDialog,
              private viewGroupService: ViewGroupService) {
    this.selectedGroup = this.viewGroupService.getSelectedGroup()
  }

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddPostComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
