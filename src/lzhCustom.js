// 博客园自带 1.7 的 jquery

export const initBeautify = function() {
    $(function () {
        var isTouchDevice = 'ontouchstart' in document.documentElement;

        /**
         * markdown img 处理，如果用 markdown 的语法或者 <img> 标签，
         * 博客园会把图片放在 iframe 里面（这样比较安全）
         * 但是样式就很难控制，并且截掉了图片的一部分，所以自定义了一个语法 lzhimg
         *
         * @author lzh
         * @date 2016-11-08 13:37
         */
        var $imgs = $('lzhimg');
        $imgs.each(function (index, item) {
            var src = $(item).attr('src'),
                alt = $(item).attr('alt');
            $(item).after('<img src="' + src + '" alt="' + alt + '" title="' + alt + '">');
        });


        //回到顶部、赞、打赏
        var $btnTool = $('.lzh-like'),
            $rewardPanel = $('.lzh-reward-panel');
        if ($('#post_detail').length === 0) {
            $btnTool.find('.like').hide();
            $btnTool.addClass('like-hide');
        }
        $btnTool.find('.to-top').click(function (e) {
            if (isTouchDevice) {
                $('body, html').animate({scrollTop: 0}, 0);
            } else {
                try {
                    $('body, html').animate({scrollTop: 0}, 500);
                } catch (e) {
                    $(document).scrollTop(0);
                }
            }
        });
        // 推荐
        $btnTool.find('.like').click(function (e) {
            var $message = $('.lzh-message');
            if (!isLogined()) {
                $('.lzh-login-panel').toggle();
            } else {
                $message.html("谢谢支持！");
                $('.diggit').trigger('click');
                var $forAnimate = $(this).find('.for-animate');
                $forAnimate.addClass('go');
                showTip($message);
                setTimeout(function () {
                    $forAnimate.removeClass('go');
                }, 510);
            }
        });
        // 展示侧边栏
        var $body = $('body');
        $btnTool.find('.show-side-bar').click(function(e) {
            $body.toggleClass('show-side-bar');
        })
        // 去登录
        $(document).on('click', '.lzh-login-panel', function (e) {
            $('.login_tips').find('a').eq(0).trigger('click');
        });
        // 打赏
        $btnTool.find('.reward').click(function () {
            $rewardPanel.toggle();
        });

        if (isTouchDevice) {
            $btnTool.addClass("touch-device");
        }


        // 许可协议
        var $postBody = $("#cnblogs_post_body");
        if ($postBody.find('noauth').length === 0) {
            $postBody.append(
                '<blockquote class="post-auth">' +
                '<p><a href="http://www.cnblogs.com/zhihuilai/">智辉</a> 本文章遵循“<a href="http://creativecommons.net.cn/licenses/meet-the-licenses/">创作共用版权协议</a>”（知识共享许可协议），要求 署名-非商业使用-禁止演绎 (by-nc-nd)。在满足创作共用版权协议的基础上可以转载，但请以超链接形式注明出处并保留此段声明。</p>' +
                '</blockquote>'
            );
        }

        // 推荐、打赏提示
        if ($postBody.find('noreward').length === 0) {
            $postBody.append(
                '<blockquote class="reward-tip">' +
                '<strong>不求打赏，如果有用推荐一下吧。</strong>' +
                '<button class="recommend-btn">推荐支持</button><button class="reward-btn">￥打赏支持</button>' +
                '</blockquote>'
            );
            $(document).on('click', '.recommend-btn', function (e) {
                $('.lzh-like .like').trigger('click');
                var $message = $('.lzh-media-message');
                if (!isLogined() && $('.lzh-login-panel').css('display') !== 'none') {
                    showTip($message);
                }
            });
            $(document).on('click', '.reward-btn', function (e) {
                $('.lzh-like .reward').trigger('click');
            })
        }

        /**
         * 判断用户是否登录
         *
         * @author lzh
         * @date 2016-10-18 09:01
         */
        function isLogined() {
            var tipHtml = $('.login_tips').html();
            if (tipHtml && tipHtml.indexOf("注册用户登录后才能发表评论") !== -1) {
                return false;
            } else {
                return true;
            }
        }

        function showTip($message) {
            $message.fadeIn(500, function () {
                setTimeout(function () {
                    $message.fadeOut(500);
                }, 500);
            });
        }

        /**
         * 为文章的 a 连接加上 target="_blank"
         *
         * @author lzh
         * @date 2016-10-26 14:20
         */
        $('#post_detail a').each(function () {
            $(this).attr('target', '_blank');
        });

        /**
         * 日历处理
         *
         * @author lzh
         * @date 2016-11-08 13:42
         */
        addClassToToday();
        $(document).on('click', '.CalNextPrev', function () {
            addClassToToday();
        });
        function addClassToToday() {
            setTimeout(function () {
                var $today = $('.CalTodayDay');
                $today.html('<span class="lzh-today">' + $today.html() + '</span>');
            }, 100);
        }

        /**
         * 评论框增加 placeholder
         */
        $('#tbCommentBody').attr("placeholder", "添加代码推荐使用右上角的功能键，这样可以高亮 keyword :)");
        addAvatarAndUserInfo(); // 增加评论头像
        var count = 0;
        var intervalId = setInterval(function () {
            if (count < 5) {
                addAvatarAndUserInfo(); // 增加评论头像
                count++;
            } else {
                clearInterval(intervalId);
            }
        }, 200);
        setTimeout(function(){
            $('#tbCommentBody').attr("placeholder", "添加代码推荐使用右上角的功能键，这样可以高亮 keyword :)");
            addAvatarAndUserInfo();
        }, 1000);
        setTimeout(function () {
            $('#tbCommentBody').attr("placeholder", "添加代码推荐使用右上角的功能键，这样可以高亮 keyword :)");
            addAvatarAndUserInfo();
        }, 8000);

        /*
         * 替换页面左上角 logo 链接
         */
        $('#Header1_HeaderTitle').attr("href", "https://home.cnblogs.com/u/zhihuilai/");
        $('#lnkBlogLogo').attr("href", "https://home.cnblogs.com/u/zhihuilai/");

        /**
         * 主体颜色
         */
        $('head').append('<meta name="theme-color" content="#2175BC">');
    });

    /**
     * 展示评论头像、修改用户信息位置
     */
    function addAvatarAndUserInfo() {
        var $feedbackItem = $('.feedbackItem');
        $feedbackItem.each(function (index, item) {
            var $item = $(item);
            if($item.find('.custom-avatars').length === 0) {
                var $feedbackManage = $item.find('.feedbackManage');
                var $commentDate = $item.find('.comment_date');
                var $userName = $commentDate.next();
                $userName.addClass('user-name');
                var $messageBtn = $userName.next();
                var userHome = $userName.attr('href');
                var $avatarSpan = $item.find('.comment_vote').next();
                var avatarUrl;
                if($avatarSpan.length !== 0) {
                    avatarUrl = $avatarSpan.html();
                } else {
                    avatarUrl = 'http://pic.cnitblog.com/face/sample_face.gif';
                }
                $feedbackManage.after('<a class="custom-avatars" target="_blank" href="' + userHome + '"><img src="' + avatarUrl + '" alt=""></a>')
                // 调整顺序
                var $customAvatars = $item.find('.custom-avatars');
                $messageBtn.insertAfter($customAvatars);
                $userName.insertAfter($customAvatars);
                var $layer = $item.find('.layer');
                var layerOuterHtml = $layer[0].outerHTML;
                var $layerNextAll = $layer.nextAll();
                var layerNextAllOuterHtml = '';
                $layerNextAll.each(function (index, item) {
                    layerNextAllOuterHtml += item.outerHTML;
                });
                $layer.after('<div class="date-wrapper"></div>');
                $layer.remove();
                $layerNextAll.remove();
                var $dateWrapper = $item.find('.date-wrapper');
                $dateWrapper.append(layerOuterHtml);
                $dateWrapper.append(layerNextAllOuterHtml);
                var $feedbackListSubtitle = $item.find('.feedbackListSubtitle');
                var feedbackListSubtitle = $feedbackListSubtitle.html();
                var indexOfBrackets = feedbackListSubtitle.indexOf('[]');
                if(feedbackListSubtitle.length - 10 === indexOfBrackets) {
                    feedbackListSubtitle = feedbackListSubtitle.slice(0, indexOfBrackets)
                    $feedbackListSubtitle.empty().append(feedbackListSubtitle);
                }
                $item.find('.louzhu').insertBefore($item.find('.sendMsg2This')).html('(作者)');
                $userName = $item.find('.user-name');
                $feedbackManage = $item.find('.feedbackManage');
                $customAvatars = $item.find('.custom-avatars');
                $layer = $item.find('.layer');
                console.log($userName, $userName.html());
                $userName.before('<div class="user-info-wrapper"></div>');
                var $userInfoWrapper = $item.find('.user-info-wrapper');
                $userInfoWrapper.append($userInfoWrapper.nextAll());
                $feedbackManage.after('<div class="avatars-user-info-wrapper"></div>');
                var $avatarsUserInfoWrapper = $item.find('.avatars-user-info-wrapper');
                $avatarsUserInfoWrapper
                    .append($customAvatars)
                    .append($userInfoWrapper);
                $layer.html($layer.html().slice(1));
            }
        });
    }
}
