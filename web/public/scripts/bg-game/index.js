/**
 * Created by liliwen on 2017/6/21.
 */
var options = {
    currentPage: 3,
    totalPages: 10,
    size:'normal',
    alignment:'right',
    tooltipTitles: function (type, page, current) {
        switch (type) {
            case "first":
                return "Tooltip for first page";
            case "prev":
                return "Tooltip for previous page";
            case "next":
                return "Tooltip for next page";
            case "last":
                return "Tooltip for last page";
            case "page":
                return "Tooltip for page " + page;
        }
    }
}

$('#paging').bootstrapPaginator(options);

console.log(1);