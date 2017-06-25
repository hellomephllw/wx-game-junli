/**
 * Created by liliwen on 2017/6/21.
 */
(function() {
    var cache = {
        api: {
            deleteGame: '/api/game'
        },
        linkUrl: {
            goGame: '/game/index.htm',
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
                currentPage: $('#currentPage').val(),
                totalPages: $('#totalPages').val(),
                numberOfPages: $('#numberOfPages').val(),
                size:'normal',
                alignment:'right',
                wrapperId: 'paging',
                onPageClicked: function(event, originalEvent, type, page) {
                    getHtml(cache.linkUrl.goGame + '?currentPage=' + page, 'mainContent');
                }
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
                getHtml(cache.linkUrl.goGameDetail + '?id=' + id, 'mainContent');
            });
        },
        addClickModifyBtnEvent: function() {
            $('#panelBody').on('click', '.panel-operate-modify', function() {
                var id = $(this).attr('data-id');

            });
        },
        addClickRemoveBtnEvent: function() {
            $('#panelBody').on('click', '.panel-operate-remove', function() {
                var bool = confirm('确定要删除？');
                var id = $(this).attr('data-id');

                if (bool) {
                    getJson({
                        type: 'delete',
                        url: cache.api.deleteGame + '/' + id,
                        done: function(data) {
                            if (data.success) {
                                toastr.success('删除成功！');
                                getHtml(cache.linkUrl.goGame, 'mainContent');
                            } else {
                                toastr.error('删除失败！');
                            }
                        }
                    });
                }
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