/**
 * Created by liliwen on 2017/6/21.
 */
(function() {
    var cache = {
        api: {
            login: '/coolguy/api/admin/login'
        }
    };

    var loginPage = {
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
            this.addClickLoginBtnEvent();
        },
        initComponent: function() {
        },
        addClickLoginBtnEvent: function() {
            $('#loginBtn').click(function() {
                var account = $('#account').val();
                var password = $('#password').val();

                getJson({
                    url: cache.api.login,
                    data: {
                        username: account,
                        password: password
                    },
                    success: function(data) {
                        $('#commonLoading').hide();
                        if (data.success) {
                            showSmallTips('登录成功！');
                            location.href = '/coolguy/admin/index.htm';
                        } else {
                            showSmallTips('账号或密码错误！');
                        }
                    }
                });
            });
        }
    };

    loginPage.init();
}());