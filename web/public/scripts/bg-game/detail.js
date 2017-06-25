/**
 * Created by liliwen on 2017/6/25.
 */
(function() {
    var detailPage = {
        init: function() {
            this.initComponent();
        },
        initComponent: function() {
            breadcrumbCpn.init();
        }
    };

    var breadcrumbCpn = {
        init: function() {
            this.initEvent();
        },
        initEvent: function() {
            $('#mainContent').on('click', '.breadcrumb', function(event) {
                var linkUrl = $(event.target).attr('data-link');
                getHtml(linkUrl, 'mainContent');
            });
        }
    };

    detailPage.init();
}());