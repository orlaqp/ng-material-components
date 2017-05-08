export default {
    entry: './dist/modules/ng-material-components.es5.js',
    dest: './dist/bundles/ng-material-components.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ngMaterialComponents',
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx'
    },
    onwarn: () => { return }
}