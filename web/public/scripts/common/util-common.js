/**
 * Created by liliwen on 2017/6/21.
 */
/**加入加载icon*/
addLoading();
function addLoading() {
    var iconBase64 = 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=';

    var $img = $('<img>').addClass('common-loading').attr('src', iconBase64).attr('id', 'commonLoading');

    $(document.body).append($img);
}

/*简单的小提示*/
function showSmallTips(words, marginTop) {
    var $tips = $('#showSmallTips');
    if ($tips.length != 0) return ;
    var $marginTop = (function() {
        var styles = '';
        if (marginTop) {
            marginTop += '';
            if (marginTop.match(/%/g) && marginTop.match(/%/g).length > 0) {
                styles = 'top: ' + marginTop + ';';
            } else {
                styles = 'margin-top: ' + marginTop + 'px; top: 0;';
            }
        }
        return styles;
    })();
    var $html = '<div id="showSmallTips" class="small-tips" style="visibility: hidden; opacity: 1; ' + $marginTop + ';"><p>' + words + '</p></div>';
    $(document.body).append($html);
    var $showSmallTips = $('#showSmallTips');
    var tipsWidth = $showSmallTips.innerWidth ? $showSmallTips.innerWidth() : $showSmallTips.width();
    $showSmallTips.css({
        marginLeft: '-' + (tipsWidth / 2) + 'px',
        left: '50%',
        visibility: 'visible'
    });
    var timer = setTimeout(function() {
        $showSmallTips.css('opacity', 0);
        clearTimeout(timer);
        timer = setTimeout(function() {
            $showSmallTips.remove();
            clearTimeout(timer);
        }, 500);
    }, 1500);
}

/**
 * ajax获取json
 * @param option
 */
function getJson(option) {
    //加载提示
    $('#commonLoading').show();

    //参数安全验证
    if (!option.url) throw new Error('不能没有url参数！');
    if (!option.done && !option.success) throw new Error('请指定回调成功后的执行函数！');

    //成功回调
    var success = function(data) {
        if ($('#commonLoading').length != 0) $('#commonLoading').hide();
        if (data.success) option.done(data);
        else showSmallTips(data.error);
    };
    if (option.success) success = function(data) {
        $('#loadingToast').hide();
        option.success(data);
    };
    //响应错误回调
    var error = function() {
        if ($('#commonLoading').length != 0) $('#commonLoading').hide();
        toastr.error('出错啦');
    };
    if (option.error) error = option.error;

    //查询参数
    var data = {};
    if (option.data) data = option.data;

    //发送请求
    $.ajax({
        type: option.type ? option.type : 'post',
        url: option.url,
        data: data,
        cache: option.cache ? option.cache : false,
        dataType: 'json',
        success: function(data) {
            success(data);
        },
        error: error
    });
}

/**
 * ajax获取html
 * @param url 视图路径
 * @param id 渲染包含块id
 */
function getHtml(url, id) {
    //加载提示
    $('#commonLoading').show();

    //发送ajax
    $.ajax({
        url: url,
        dataType: 'html',
        success: function(data) {
            $('#commonLoading').hide();
            $('#' + id).html(data);
        },
        error: function() {
            toastr.error('出错啦！');
            $('#commonLoading').hide();
        }
    });
}