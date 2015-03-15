import Ember from 'ember';

export default Ember.Controller.extend({

    iconData: [
        {name: 'icon-home'        , color: "#777" },
        {name: 'icon-user-plus'   , color: "rgb(89, 226, 168)" },
        {name: 'icon-google-plus2', color: "#A00" },
        {name: 'icon-youtube4'    , color:"#00A" },
        // Use theming to color the font-icon
        {name: 'icon-settings'    , color:"#A00", theme:"md-warn md-hue-5"}
    ],

    sizes: [
        {size:12,padding:0, previewScaleStyle: 'padding-left: 0px', sizeStyle: 'font-size: 12px; height: 12px;'},
        {size:21,padding:2, previewScaleStyle: 'padding-left: 2px', sizeStyle: 'font-size: 21px; height: 21px;'},
        {size:36,padding:6, previewScaleStyle: 'padding-left: 6px', sizeStyle: 'font-size: 36px; height: 36px;'},
        {size:48,padding:10, previewScaleStyle: 'padding-left: 10px', sizeStyle: 'font-size: 48px; height: 48px;'}
    ],

    icons: function() {
        var self = this;

        var iconData = this.get('iconData');

        iconData.forEach(function(i) {
            i.sizes = Ember.copy(self.sizes, true);

            debugger;

            i.sizes.forEach(function(size) {
                var color = !i.theme && i.color;
                size.sizeStyle = size.sizeStyle + ' color: ' + color + '; ';
            });
        });

        //iconData.forEach(function(i) {
        //    var sizes = i.sizes;
        //
        //    var color = !i.theme && i.color;
        //
        //    debugger;
        //
        //    sizes.forEach(function(s) {
        //        s.sizeStyle = s.sizeStyle + ' color: ' + color + ';';
        //    });
        //
        //});


        console.log('icons', this.get('iconData'));

        return this.get('iconData');



    }.property('iconData')

});
