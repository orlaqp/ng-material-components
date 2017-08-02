import { SelectionItem } from '../../..';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  Component,
  OnInit
} from '@angular/core';
// import { MenuItem } from 'ng-material-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  fg: FormGroup;

  tarjetItems: SelectionItem[] = [
    { id: 'one', title: 'one', selected: false, disabled: false},
    { id: 'two', title: 'two', selected: false, disabled: false},
    { id: 'three', title: 'three', selected: false, disabled: false},
  ];

  ngOnInit() {
      this.fg = new FormGroup({
            'name': new FormControl(),
            'tarjet': new FormControl()
        });

      this.fg.controls['name'].valueChanges.subscribe(v => {
          debugger;
          console.dir(v);
      });

      const that = this;
      setTimeout(function() {
        that.fg.controls['firstName'].setValue('Orlando');
        that.fg.controls['tarjet'].setValue('three');
      }, 2000);
  }

  public actionItems: any[] = [{
      id: '1',
      icon: 'refresh-alt'
    },
    {
      id: '1',
      icon: 'download'
    },
    {
      id: '1',
      icon: 'more-vert',
      children: [{
          id: '31',
          title: 'Toggle Fullscreen',
          icon: 'fullscreen'
        },
        {
          id: '32',
          title: 'Reset',
          icon: 'delete'
        },
        {
          id: '33',
          title: 'Settings',
          icon: 'settings'
        },
      ]
    },
  ];
}
