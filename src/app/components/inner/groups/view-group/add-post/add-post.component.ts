import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {AddPostRequest} from "./add-post-request";
import {PostService} from "../post/post.service";
import {Post} from "../post/post";
import {NotifierService} from "angular-notifier";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {data} from "autoprefixer";


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

   public parentComponentData: any


  constructor(private _ngZone: NgZone,
              private postService: PostService,
              private notifier: NotifierService,
              @Inject(MAT_DIALOG_DATA)  data: any
  ) {
     this.parentComponentData = data;
  }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }

  onPostAdd(addPostRequest: AddPostRequest) {
    addPostRequest.groupId = this.parentComponentData?.groupId;
    this.postService.addPost(addPostRequest).subscribe({
      next: (post: Post) => {
        this.notifier.notify('success', "Post dodany")
        this.postService.postPusher.next(post)
      },
      error: err => {
        console.log(err);
        this.notifier.notify('error', "Nie udało się dodać postu")
      }
    })
  }
}
