import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Subject} from "../../../domain/subject";
import {take} from "rxjs";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  public subjectValues = Object.values(Subject)
  public subjectKeys = Object.keys(Subject)

  constructor(private _ngZone: NgZone) { }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  ngOnInit(): void {
  }

}
