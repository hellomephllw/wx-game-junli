/**
 * Created by liliwen on 2017/7/2.
 */
(function() {
    var cache = {
        api: {
            getGames: '/api/game',
            getGoodyBag: '/api/goodybag'
        },
        games: []
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
        renderGames: function() {
            var html = '';

            cache.games.forEach(function(game) {
                var dataCtrl = {
                    id: game.id,
                    showLevel: ' style="display:none"',
                    imgPath: game.imgPath,
                    desc: game.description
                };

                html += '<div class="game" data-id="' + dataCtrl.id + '">' +
                            '<img class="game-level" src="" ' + dataCtrl.showLevel + ' />' +
                            '<img class="game-background" src="' + dataCtrl.imgPath + '" />' +
                            '<div class="game-banner">' + dataCtrl.desc + '</div>' +
                        '</div>';
            });

            $('#wholeWrap').append(html);
        },
        addClickGameEvent: function() {
            $('#wholeWrap').on('click', '.game', function() {
                var gameId = $(this).attr('data-id');


            });
        }
    };

    wxIndexPage.init();
}());