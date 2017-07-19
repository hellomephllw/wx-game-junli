/**
 * Created by liliwen on 2017/7/2.
 */
(function() {
    var cache = {
        api: {
            getGames: '/coolguy/api/game',
            getGoodyBag: '/coolguy/api/goodybag',
            getRedeemKeyCount: function(goodyBagId) {
                return '/coolguy/api/goodybag/' + goodyBagId + '/count';
            },
            getRedeemKey: function(goodyBagId) {
                return '/coolguy/api/goodybag/' + goodyBagId + '/redeemkey/one';
            }
        },
        games: [],
        chosenGoodyBagId: ''
    };

    var wxIndexPage = {
        init: function() {
            var _this = this;
            this.initData(function() {
                _this.initPage();
                _this.initEvent();
            });
        },
        initData: function(callback) {
            this.storeGames(callback);
        },
        initPage: function() {
            this.renderGames();
        },
        initEvent: function() {
            this.addClickGameEvent();
            this.addClickCloseAlertEvent();
            this.addClickObtainRedeemKeyEvent();
        },
        storeGames: function(callback) {
            getJson({
                type: 'get',
                url: cache.api.getGames,
                done: function(data) {
                    cache.games = data.data;
                    console.log(data);
                    callback();
                }
            });
        },
        getGoodyBag: function() {
            return '' +
                    '<div id="goodyBagDesc" class="goodybag-desc"></div>' +
                    '<div class="goodybag-process">' +
                        '<p class="goodybag-remaincount">礼包剩余<span id="processWords">0</span>%</p>' +
                        '<div class="goodybag-barwrap">' +
                            '<img id="processBar" class="goodybag-bar" style="width: 0;" src="/coolguy/images/wx/liaobaosytiao2.png"/>' +
                        '</div>' +
                    '</div>' +
                    '<div id="obtainRedeemKeyBtn" class="goodybag-btn"></div>';
        },
        getRedeemKey: function() {
            return '<div class="redeemkey">' +
                        '<div id="redeemKey" class="redeemkey-code"></div>' +
                        '<p class="redeemkey-words">长按复制</p>' +
                    '</div>';
        },
        renderGames: function() {
            var html = '';

            cache.games.forEach(function(game, i) {
                var dataCtrl = {
                    id: game.id,
                    x: i % 2 === 0 ? 380 : -380,
                    levelSrc: (function() {
                        if (game.rankNo == 1) return '/coolguy/images/wx/picn1.png';
                        else if (game.rankNo == 2) return '/coolguy/images/wx/picn1.png';
                        else if (game.rankNo == 3) return '/coolguy/images/wx/picn1.png';
                        return '';
                    }()),
                    showLevel: (function() {
                        if (game.rankNo == 999) return ' style="display:none"';
                    }()),
                    imgPath: game.imgPath,
                    desc: game.description
                };

                html += '<div class="game" data-id="' + dataCtrl.id + '" style="transform: translate3d(' + dataCtrl.x + 'px, 0, 0)">' +
                            '<img class="game-level" src="' + dataCtrl.levelSrc + '" ' + dataCtrl.showLevel + ' />' +
                            '<img class="game-background" src="' + dataCtrl.imgPath + '" />' +
                            '<div class="game-banner">' + dataCtrl.desc + '</div>' +
                        '</div>';
            });

            $('#wholeWrap').append(html);

            var timer = setTimeout(function() {
                clearTimeout(timer);
                $('.game').css('transform', 'translate3d(0,0,0)');
            }, 10);
        },
        addClickGameEvent: function() {
            var _this = this;
            $('#wholeWrap').on('click', '.game', function() {
                var gameId = $(this).attr('data-id');

                var $goodyBagAlert = $('#goodyBagAlert');
                $('#alertContent').html(_this.getGoodyBag());

                //获取礼包信息
                getJson({
                    type: 'get',
                    url: cache.api.getGoodyBag + '/' + gameId,
                    done: function(data) {
                        console.log(data);
                        var goodyBagId = data.result.id;
                        var goodyBagName = data.result.name;
                        var goodyBagDesc = data.result.description;

                        cache.chosenGoodyBagId = goodyBagId;

                        getJson({
                            type: 'get',
                            url: cache.api.getRedeemKeyCount(goodyBagId),
                            done: function(data) {
                                console.log(data);
                                var processTotal = data.total;
                                var processObtained = data.obtained;

                                //初始化弹窗title
                                $('#goodyBagName').html(goodyBagName);

                                //显示礼包弹出框
                                $goodyBagAlert.show().css('opacity', 0);
                                var timer = setTimeout(function() {
                                    //初始化描述
                                    $('#goodyBagDesc').html(goodyBagDesc);
                                    //初始化进度条
                                    var processBarWidth = $('#processBar').parent().width();
                                    $('#processBar').css('width', (processObtained / processTotal) * processBarWidth);
                                    //初始化进度数字
                                    var $processWords = $('#processWords');
                                    var finalNum = Math.round(processObtained / processTotal * 100);
                                    var currNum = 0;
                                    var interval = setInterval(function() {
                                        if (finalNum === 0) return clearInterval(interval);
                                        $processWords.html(++currNum);
                                        if (currNum === finalNum) clearInterval(interval);
                                    }, 30);

                                    clearTimeout(timer);
                                    $goodyBagAlert.css('opacity', 1);
                                }, 10);
                            }
                        });
                    }
                });
            });
        },
        addClickCloseAlertEvent: function() {
            $('#wholeWrap').on('click', '#goodyBagClose', function() {
                var $goodyBagAlert = $('#goodyBagAlert');

                $goodyBagAlert.css('opacity', 0);
                var timer = setTimeout(function() {
                    clearTimeout(timer);
                    $goodyBagAlert.hide();
                }, 300);
            });
        },
        addClickObtainRedeemKeyEvent: function() {
            var _this = this;
            $('#wholeWrap').on('click', '#obtainRedeemKeyBtn', function() {
                $('#alertContent').html(_this.getRedeemKey());
                getJson({
                    type: 'get',
                    url: cache.api.getRedeemKey(cache.chosenGoodyBagId),
                    success: function(data) {
                        if (data.success) {
                            $('#redeemKey').html(data.code);
                        } else {
                            showSmallTips('sorry，兑换码已经被领取完啦！');
                        }
                        $('#commonLoading').hide();
                    }
                });
            });
        }
    };

    wxIndexPage.init();
}());