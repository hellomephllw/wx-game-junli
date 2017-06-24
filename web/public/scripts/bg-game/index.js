/**
 * Created by liliwen on 2017/6/21.
 */
(function() {
    var cache = {
        linkUrl: {
            goGameNew: '/game/new.htm',
            goGameDetail: '/game/detail.htm',
            goGameModify: '/game/modify.htm'
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
            this.addClickDetailBtnEvent();
            this.addClickModifyBtnEvent();
            this.addClickRemoveBtnEvent();
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
        },
        addClickDetailBtnEvent: function() {
            $('#panelBody').on('click', '.panel-operate-detail', function() {
                var id = $(this).attr('data-id');
                alert($(this).attr('data-id'));
            });
        },
        addClickModifyBtnEvent: function() {
            $('#panelBody').on('click', '.panel-operate-modify', function() {
                var id = $(this).attr('data-id');

            });
        },
        addClickRemoveBtnEvent: function() {
            $('#panelBody').on('click', '.panel-operate-remove', function() {
                var id = $(this).attr('data-id');

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