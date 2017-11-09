export const slicePostDate = function () {
    $(function () {
        var $postDates = $('.day .postDesc');
        var reg = /[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]/;
        $postDates.each(function (index, item) {
            var $item = $(item);
            $item.find('a').remove();
            var postDate = $item.html();
            var date = postDate.match(reg);
            var count = postDate.slice(postDate.indexOf('阅读'), postDate.length);
            $item.html(date + ' ' + count);
            $item.css('opacity', '1');
        })
    })
};