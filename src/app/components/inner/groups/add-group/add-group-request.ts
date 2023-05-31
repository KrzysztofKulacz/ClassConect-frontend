import {Subject} from "src/app/components/domain/subject";

export interface AddGroupRequest {
  subject: Subject,
  description: string,
  groupName: string,
  password: string,
  memberEmail: string
}
