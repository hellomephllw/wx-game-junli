/**
 * Created by liliwen on 2017/6/25.
 */
module.exports = {
    _pageSize: 5,
    _totalPages: 0,
    _currentPage: 1,
    _numberOfPages: 3,
    receive: function(currentPage) {
        this.setCurrentPage(currentPage);

        var firstRow = (this.getCurrentPage() - 1) * this.getPageSize();
        var pageSize = this.getPageSize();

        return {
            firstRow: firstRow,
            pageSize: pageSize
        };
    },
    give: function(results, count) {
        var _this = this;

        return {
            currentPage: _this.getCurrentPage(),
            totalPages: count % _this.getPageSize() == 0 ? parseInt(count / _this.getPageSize()) : parseInt(count / _this.getPageSize()) + 1,
            pageSize: _this.getPageSize(),
            numberOfPages: _this.getNumberOfPages(),
            rows: results
        };
    },
    getPageSize: function() {
        return this._pageSize;
    },
    setPageSize: function(pageSize) {
        this._pageSize = pageSize;
    },
    getTotalPage: function() {
        return this._totalPages;
    },
    setTotalPage: function(totalPage) {
        this._totalPages = totalPage;
    },
    getCurrentPage: function() {
        return this._currentPage;
    },
    setCurrentPage: function(currentPage) {
        this._currentPage = currentPage;
    },
    getNumberOfPages: function() {
        return this._numberOfPages;
    },
    setNumberOfpages: function(numberOfPages) {
        this._numberOfPages = numberOfPages;
    }
};