import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./post";
import {PostService} from "./post.service";
import {NotifierService} from "angular-notifier";
import {MatDialog} from "@angular/material/dialog";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {AuthorizationService} from "../../../../authorization/authorization.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post!: Post;

  @Input()
  groupAdminId!: string

  isModifiable: boolean = false;

  constructor(private postService: PostService,
              private notifier: NotifierService,
              private dialog: MatDialog,
              private authorizationService:AuthorizationService) {
  }

  ngOnInit(): void {
    this.isModifiable = this.authorizationService.canModifyPost(this.post.postAuthorId,this.groupAdminId)
  }

  public onPostDelete(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.notifier.notify('success', 'Post usunięty');
        this.postService.postRemover.next(postId);
      },
      error: err => {
        console.error(err)
        this.notifier.notify('error', "Nie udało się usunąć postu")
      }
    })
  }

  public openEditPostDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditPostComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        post: this.post
      }
    });
  }
}
