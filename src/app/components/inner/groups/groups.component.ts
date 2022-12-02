import {Component, OnInit} from '@angular/core';
import {Group} from "./group";
import {Subject} from "../../domain/subject";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  posts: Group[] = [
    {
      mainImageUrl: 'https://source.unsplash.com/odxB5oIG_iA/400x250',
      subject: Subject.ALGORITHMS_AND_DATA_STRUCTURES,
      title: 'The Road to Freedom',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
      creationDate: '10th August 2020',
    },
    {
      mainImageUrl: 'https://source.unsplash.com/e-S-Pe2EmrE/400x250',
      subject: Subject.MACHINE_LEARNING,
      title: 'The Road to Freedom',
      description:
        'A vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
      creationDate: '10th August 2020',
    },
    {
      mainImageUrl: 'https://source.unsplash.com/EAvS-4KnGrk/400x250',
      subject: Subject.PHYSICS,
      title: 'The Road to Freedom',
      description:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam',
      creationDate: '10th August 2020',
    },
    {
      mainImageUrl: 'https://source.unsplash.com/RP6Ba_6U154/400x250',
      subject: Subject.MATH,
      title: 'The Road to Freedom',
      description:
        'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, Quis autem vel ',
      creationDate: '10th August 2020',
    },
    {
      mainImageUrl: 'https://source.unsplash.com/EAvS-4KnGrk/400x250',
      subject: Subject.PHYSICS,
      title: 'The Road to Freedom',
      description:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam',
      creationDate: '10th August 2020',
    },
    {
      mainImageUrl: 'https://source.unsplash.com/e-S-Pe2EmrE/400x250',
      subject: Subject.MACHINE_LEARNING,
      title: 'The Road to Freedom',
      description:
        'A vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
      creationDate: '10th August 2020',
    },
    {
      mainImageUrl: 'https://source.unsplash.com/odxB5oIG_iA/400x250',
      subject: Subject.ALGORITHMS_AND_DATA_STRUCTURES,
      title: 'The Road to Freedom',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
      creationDate: '10th August 2020',
    },

    {
      mainImageUrl: 'https://source.unsplash.com/EAvS-4KnGrk/400x250',
      subject: Subject.PHYSICS,
      title: 'The Road to Freedom',
      description:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam',
      creationDate: '10th August 2020',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
