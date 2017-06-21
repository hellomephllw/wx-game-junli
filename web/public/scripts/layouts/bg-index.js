/**
 * Created by liliwen on 2017/6/21.
 */
(function() {
    var cache = {
        viewUrl: {
            homepage: '/admin/homepage.htm',
            game: '/game/index.htm'
        }
    };

    var indexPage = {
        init: function() {
            this.initPage();
            this.initEvent();
        },
        initPage: function() {
            this.useHomepage();
        },
        initEvent: function() {
            this.addClickLeftNavEvent();
        },
        useHomepage: function() {
            $('.left-nav-event').eq(0).addClass('active');
            getHtml(cache.viewUrl.homepage, 'mainContent');
        },
        addClickLeftNavEvent: function() {
            $('#sideBarNav').on('click', '.left-nav-event', function(event) {
                var $target = $(event.currentTarget);
                var page = $target.attr('data-page');
                $('.left-nav-event').removeClass('active');
                changeMainContent(page);
            });

            function changeMainContent(page) {
                var containerId = 'mainContent';
                switch (page) {
                    case 'homepage':
                        getHtml(cache.viewUrl.homepage, containerId);
                        break;
                    case 'game':
                        getHtml(cache.viewUrl.game, containerId);
                        break;
                }
            }
        }
    };

    indexPage.init();
}());