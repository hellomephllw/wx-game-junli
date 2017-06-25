/**
 * Created by liliwen on 2017/6/22.
 */
(function() {
    var cache = {
        api: {
            addNewGame: '/api/game'
        },
        linkUrl: {
            goGameIndex: '/game/index.htm'
        }
    };

    var newPage = {
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
            this.addClickUploadBtnEvent();
            this.addShowUploadImageEvent();
            this.addSubmitBtnEvent();
        },
        initComponent: function() {
            breadcrumbCpn.init();
        },
        addClickUploadBtnEvent: function() {
            $('#uploadProxyBtn').click(function(event) {
                event.preventDefault();
                $('#upload').click();
            });
        },
        addShowUploadImageEvent: function() {
            $('#upload').change(function() {
                var file = this.files[0];
                if(!/image\/\w+/.test(file.type)){
                    toastr.warn('上传的文件必须是图片！');
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    var imgBase64Data = e.target.result;
                    $('#showImage').css('width', 400).attr('src', imgBase64Data);
                }
            });
        },
        addSubmitBtnEvent: function() {
            $('#ok').click(function() {
                submitForm('post', cache.api.addNewGame, 'form', function() {
                    toastr.success('add a new game successfully!');
                    getHtml(cache.linkUrl.goGameIndex, 'mainContent');
                });
            });
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

    newPage.init();
}());