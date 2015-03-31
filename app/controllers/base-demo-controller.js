import Ember from 'ember';

export default Ember.Controller.extend({
    showSource: false,

    showSourceClass: function() {
        var showSourceClass = this.get('showSource') ? 'show-source' : '';
        return showSourceClass.htmlSafe();
    }.property('showSource'),

    demoName: '',

    sourceFiles: null,

    setSourceFiles: function() {
        var demoName = this.get('demoName');

        var sourceFiles = Ember.ArrayProxy.create({
            content: [
                {name: 'hbs', content: demoName + '-index.hbs'},
                {name: 'controller', content: demoName + '-controller.js'},
                {name: 'route', content: demoName + '-route.js'},
                {name: 'css', content: demoName + '-style.css'}
            ]
        });

        this.set('sourceFiles', sourceFiles);
    }.on('init'),

    actions: {
        showSource: function() {
            this.toggleProperty('showSource');
        }
    }


});
