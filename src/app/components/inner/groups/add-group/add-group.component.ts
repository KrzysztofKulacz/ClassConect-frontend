import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Subject} from "../../../domain/subject";
import {take} from "rxjs";

import {AddGroupRequest} from "./add-group-request";
import {AddGroupService} from "./add-group.service";
import {NotifierService} from "angular-notifier";
import {Group} from "../group";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  public subjectValues = Object.values(Subject)
  public subjectKeys = Object.keys(Subject)

  constructor(private _ngZone: NgZone,
              private addGroupService: AddGroupService,
              private notifier: NotifierService) {
  }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }

  onGroupAdd(addGroupRequest: AddGroupRequest) {
    this.addGroupService.addGroup(addGroupRequest).subscribe({
      next: (group: Group) => {
        this.notifier.notify('success', "Nowa grupa dodana")
        this.addGroupService.groupPusher.next(group)
      },
      error: err => {
        console.log(err);
        this.notifier.notify('error', "Nie udało się dodać nowej grupy - spróbuj jeszcze raz")
      }
    });
  }
}
