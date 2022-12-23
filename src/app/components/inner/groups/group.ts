import {Subject} from "../../domain/subject";

export interface Group {
  mainImageUrl: string;
  subject: Subject;
  title: string;
  description: string;
  creationDate: Date;
  groupId: string;
  groupAdmin: string;
  password: string;
  imageUrl: string;
}
