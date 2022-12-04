import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../domain/subject";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  public subjectValues = Object.values(Subject)
  public subjectKeys = Object.keys(Subject)

  constructor() { }

  ngOnInit(): void {
  }

}
