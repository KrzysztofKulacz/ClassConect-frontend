import {Injectable} from '@angular/core';
import {Group} from "../group";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ViewGroupService {


  constructor() {
  }

  public setSelectedGroup(group: Group) {
    group.imageUrl = ''
    localStorage.setItem(environment.inner.selectedGroup, JSON.stringify(group))
  }

  public getSelectedGroup(): Group {
    return JSON.parse(environment.inner.selectedGroup)
  }

  public removeSelectedGroup() {
    localStorage.removeItem(environment.inner.selectedGroup)
  }
}
