import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {AddPostRequest} from "./add-post-request";




@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private _ngZone: NgZone) { }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }

  onPostAdd(addPostRequest: AddPostRequest) {

  }
}
