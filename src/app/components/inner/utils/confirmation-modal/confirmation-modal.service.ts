import { Injectable } from '@angular/core';
import {Observable, Subject as RxSubject} from "rxjs";
import {Group} from "../../groups/group";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  public messagePusher = new RxSubject<String>();
  public resultPusher = new RxSubject<Boolean>();

  constructor() { }
}
