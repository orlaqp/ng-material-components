import {
  SelectionItem
} from '../../..';
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

  tarjetItems: SelectionItem[] = [{
      id: 'one',
      title: 'one',
      selected: false,
      disabled: false
    },
    {
      id: 'two',
      title: 'two',
      selected: false,
      disabled: false
    },
    {
      id: 'three',
      title: 'three',
      selected: false,
      disabled: false
    },
  ];

  categories: SelectionItem[] = [{
      id: 'one',
      title: 'Category 1',
      selected: false,
      disabled: false
    },
    {
      id: 'two',
      title: 'Category 2',
      selected: false,
      disabled: false
    },
    {
      id: 'three',
      title: 'Category 3',
      selected: false,
      disabled: false
    },
  ];

  products = [{
      id: '1',
      category: 'one',
      name: 'Cat1 - Product 1'
    },
    {
      id: '2',
      category: 'one',
      name: 'Cat1 - Product 1'
    },
    {
      id: '3',
      category: 'two',
      name: 'Cat2 - Product 2'
    },
    {
      id: '4',
      category: 'two',
      name: 'Cat2 - Product 2'
    },
    {
      id: '5',
      category: 'three',
      name: 'Cat3 - Product 3'
    },
    {
      id: '6',
      category: 'three',
      name: 'Cat3 - Product 3'
    }
  ];


  productItems: SelectionItem[] = [];

  private _selectedProduct = '2';

  ngOnInit() {
    this.fg = new FormGroup({
      'name': new FormControl(),
      'tarjet': new FormControl(),
      // category: new FormControl('three')
    });

    this.fg.controls['name'].valueChanges.subscribe(v => {
      console.dir(v);
    });

    const that = this;
    // setTimeout(function() {
    //   that.fg.controls['firstName'].setValue('Orlando');
    //   that.fg.controls['tarjet'].setValue('three');
    //   that.fg.controls['category'].setValue('three');
    // }, 2000);

    setTimeout(function () {
      that.fg.patchValue({
        firstName: 'firstname (patched)',
        tarjet: 'target (patched)',
        category: 'two',
        product: '3'
      })

    }, 2500);

    setTimeout(function () {
      that.fg.patchValue({
        category: 'one',
        product: '1'
      })

    }, 3500);

    // setTimeout(function () {
    //   that.fg.patchValue({
    //     product: '2'
    //   })

    // }, 4500);
  }

  updateProductItems(category) {
    this.productItems = this.products.filter(p => p.category === category)
      .map(p => {
        return {
          id: p.id,
          title: p.name,
          selected: false,
          disabled: false
        }
      });
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
