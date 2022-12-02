import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../group';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  data!: Group;

  constructor() {}

  ngOnInit(): void {}
}
