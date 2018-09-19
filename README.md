I no longer maintain this package so this repository is **deprecated**

Thanks to:

https://github.com/robisim74/angular-library-starter

*** How To Use ***


```
npm install -g angular-cli
ng new <app name>
cd <app name>

npm install --save ng-material-components
```

then, edit the style.css file from you angular app and import the css of the library. Add the following line

```scss
@import '../node_modules/ng-material-components/bundles/app.css';
```

finally, you should add it to your module by doing something like this:

```typescript
import {
  MaterialFormsModule,
  MaterialUserInterfaceModule
} from 'ng-material-components/modules/ng-material-components';

...

@NgModule({
  imports: [
      ...
      MaterialFormsModule.forRoot(),
      MaterialUserInterfaceModule.forRoot()
      ...
  ],
  declarations: [
      ...
  ],
  exports: [
    ...
  ],
  providers: [
      ...
  ]
})
export class AppModule { }

```

And that should be it. 

I am working on a new demo site that will allow you to easily copy and paste sample code to test all the library controls
into your app.

Enjoy!

(More documentation is coming)

