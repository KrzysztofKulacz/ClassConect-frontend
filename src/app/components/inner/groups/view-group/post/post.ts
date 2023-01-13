import {Subject} from "../../../../domain/subject";

export interface Post {
  groupId: string,
  postAuthorId: string,
  postId: string,
  title: string,
  text: string,
  creationDate: Date,
}
