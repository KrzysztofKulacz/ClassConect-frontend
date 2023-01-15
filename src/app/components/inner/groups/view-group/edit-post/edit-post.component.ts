import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Post} from "../post/post";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {PostService} from "../post/post.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public editPost: Post

  constructor(@Inject(MAT_DIALOG_DATA)  data: any,
              private _ngZone: NgZone,
              private postService: PostService,
              private notifier: NotifierService,) {
    this.editPost = data?.post;
  }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }

  public onPostEdit(post: Post) {
    this.editPost.title = post.title;
    this.editPost.content = post.content
    this.postService.editPost(this.editPost).subscribe({
      next:(post:Post) =>{
        this.notifier.notify('success','Post pomyślnie zeedytowany');
        this.postService.postEditor.next(post);
      }
    })
  }
}
