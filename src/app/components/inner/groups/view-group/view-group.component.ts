import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddPostComponent} from "./post/add-post/add-post.component";
import {ViewGroupService} from "./view-group.service";
import {Group} from "../group";
import {Post} from "./post/post";
import {PostService} from "./post/post.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {

  public selectedGroup!: Group
  public allPosts: Post[] = []

  constructor(private dialog: MatDialog,
              private viewGroupService: ViewGroupService,
              private postService: PostService,
              private notifier: NotifierService) {
    this.selectedGroup = this.viewGroupService.getSelectedGroup()
  }

  ngOnInit(): void {
    this.loadAllPosts()
    this.refreshAfterPostAdd()
    this.refreshAfterPostDelete()
    this.refreshAfterPostEdit()
  }

  openAddPostDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddPostComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        groupId: this.selectedGroup.groupId
      }
    });
  }

  private loadAllPosts() {
    this.postService.getAllPosts(this.selectedGroup.groupId).subscribe({
      next: (posts: Post[]) => {
        this.allPosts = posts;
      },
      error: err => {
        console.log(err)
        this.notifier.notify('error', "Wystąpił bład w trakcie ładowania postów - spróbuj później")
      },
    })
  }

  private refreshAfterPostAdd() {
    this.postService.postPusher.subscribe({
      next: (post: Post) => {
        this.allPosts.push(post)
      }
    })
  }

  private refreshAfterPostDelete() {
    this.postService.postRemover.subscribe({
      next: (deletedPost: String) => {
        this.allPosts = this.allPosts.filter(value => value.postId !== deletedPost)
      }
    })
  }

  private refreshAfterPostEdit() {
    this.postService.postEditor.subscribe({
      next: (editedPost: Post) => {
        this.allPosts = this.allPosts.map(post=> post.postId === editedPost.postId ? editedPost: post)
      }
    })
  }
}
