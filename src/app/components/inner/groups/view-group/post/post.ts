import {Subject} from "../../../../domain/subject";

export interface Post {
  postId: string,
  groupId: string,
  postAuthorId: string,
  postAuthor: string,
  title: string,
  content: string,
  creationDate: Date,
}

