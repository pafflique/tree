var url = document.URL;
var base = url.substring(0, url.lastIndexOf('/') + 1);

require.config({
    baseUrl: base + '../target/compiled',
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    plugins: [
        "text"
    ],
    paths: {
        underscore: '../../lib/underscrore',
        backbone: '../../lib/backbone',
        jquery: '../../lib/jquery',
        text: '../../plugin/text'
    }
});