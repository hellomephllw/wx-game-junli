/**
 * Created by liliwen on 2017/6/21.
 */
(function() {
    var cache = {
        linkUrl: {
            goGameNew: '/game/new.htm'
        }
    };

    var indexPage = {
        init: function() {
            this.initData();
            this.initPage();
            this.initEvent();
            this.initComponent();
        },
        initData: function() {

        },
        initPage: function() {

        },
        initEvent: function() {
            this.addClickNewBtnEvent();
        },
        initComponent: function() {
            paginatorCpn.init({
                currentPage: 3,
                totalPages: 10,
                size:'normal',
                alignment:'right',
                wrapperId: 'paging'
            });
        },
        addClickNewBtnEvent: function() {
            $('#new').click(function() {
                getHtml(cache.linkUrl.goGameNew, 'mainContent');
            });
        }
    };

    var paginatorCpn = {
        cache: null,
        init: function(option) {
            this.initData(option);
            this.initPage();
            this.initEvent();
        },
        initData: function(option) {
            this.storeCache(option);
        },
        initPage: function() {
            this.renderPaginator();
        },
        initEvent: function() {

        },
        storeCache: function(option) {
            this.cache = option;
        },
        renderPaginator: function() {
            $('#' + this.cache.wrapperId).bootstrapPaginator(this.cache);
        }
    };

    indexPage.init();
}());