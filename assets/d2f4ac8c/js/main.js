
$(document).ready(function () {
    if ($(window).width() > 768) {
        $('#fullpage').fullpage({
            menu: "#menu",
            slidesNavigation: true,
            scrollOverflow: true,
            onLeave: function (oldIndex, newIndex) {
                $('.lines a').removeClass('active');
                $('.lines a').eq(newIndex - 1).addClass('active');
            },
            afterLoad: function (anchor, index) {
                $('.lines a').removeClass('active');
                $('.lines a').eq(index - 1).addClass('active');
            }
        });
    }
    if ($(window).width() < 768) {
        $('.galleryWrapper').addClass('swiper-container');
        $('.galleryWrapper .galleryItem').addClass('swiper-wrapper');
        $('.galleryWrapper .galleryItem >div').addClass('swiper-slide');
        var mySwiper = new Swiper('.galleryWrapper.swiper-container', {});
    }


    $(window).resize(function () {
        $('#fullpageNormal .section').css('min-height', $(window).height());
    });
    $(window).resize();

    $(document).on('click', '.galleryWrapper .galleryItem >div', function (e) {
        e.preventDefault();
        var next = $(e.currentTarget).parents('.galleryWrapper').find('.pager a.active').next();
        if (!next.length) {
            next = $(e.currentTarget).parents('.galleryWrapper').find('.pager a').first();
        }
        next.trigger('click');
        return false;
    });

    $(document).on('click', '.galleryWrapper .pager a', function (e) {
        e.preventDefault();
        var $gallery = $(e.currentTarget).parents('.galleryWrapper');
        $gallery.find('.pager a').removeClass('active');
        $(e.currentTarget).addClass('active');
        $gallery.find('.galleryItem div').removeClass('active');
        $gallery.find('.galleryItem div').eq($(e.currentTarget).index()).addClass('active');
        return false;
    });

    var mainClickTimeout;

    var mainClickAnimate = function () {
        var $newEl = $('.main .numbers a.active').next();
        if (!$newEl.length) {
            $newEl = $('.main .numbers a').first();
        }
        $newEl.trigger('click');
    };

    var mainAnimationTimeout, allowAnimate = true;
    var mainAnimation = function (forceAnimate) {
        clearTimeout(mainAnimationTimeout);
        if (allowAnimate || forceAnimate) {
            var $el = $('.mainAnimation img.active');
            var $newEl = $el.next();
            if (!$el.length) {
                $newEl = $('.mainAnimation img').first();
            }
            if (!$newEl.length) {
                $newEl = $el.siblings('img').first();
            }
            $el.removeClass('active');
            $newEl.addClass('active');
        }
        mainAnimationTimeout = setTimeout(function () {
            mainAnimation();
        }, 1000);
    };

    mainAnimation();

    var textAnimationTimeout;
    var textAnimation = function () {
        clearTimeout(textAnimationTimeout);
        var $el = $('.numbers .text span.current');
        var $newEl = $el.next();
        if (!$el.length) {
            $newEl = $('.numbers .text span').first();
        }
        if (!$newEl.length) {
            $newEl = $el.parents('.text').find('span').first();
        }
        $el.removeClass('current');
        $newEl.addClass('current');
        $('.sectionDesc').removeClass('pushed');
        // $('.sectionDesc .dop').remove();
        // $('.sectionDesc').prepend('<div class="dop">' + $newEl.html() + '</div>');
        $('.sectionDesc .dop').html($newEl.html());

        textAnimationTimeout = setTimeout(function () {
            $('.sectionDesc').addClass('pushed');
            textAnimationTimeout = setTimeout(function () {
                // $('.sectionDesc .dop').remove();
                $('.sectionDesc').removeClass('pushed');
                $('.sectionDesc div').html($newEl.html());
                textAnimationTimeout = setTimeout(function () {
                    textAnimation();
                }, 2350);
            }, 300);
        }, 10);
    };

    //Main headerText animation---------

    //------------------------------
    $('.mainAnimation img').hover(function () {
        allowAnimate = false;
    }, function () {
        allowAnimate = true;
    })

    $(document).on('click', '.mainAnimation img', function (e) {
        e.preventDefault();
        mainAnimation(true);
        return false;
    });


    $(document).on('click', '.main .numbers a', function (e) {
        e.preventDefault();
        clearTimeout(textAnimationTimeout);

        var $el = $(e.currentTarget);
        $('.mainAnimation img').removeClass('active');
        $('.mainAnimation>div').eq($el.index()).find('img').first().addClass('active');
        $('.main .numbers a').removeClass('active');
        $el.addClass('active');

        $('.numbers .text span.current').removeClass('current');
        $el.find('.text span').first().addClass('current');

        $('.sectionDesc .dop').remove();
         $('.sectionDesc').prepend('<div class="dop">' + $el.find('.text span.current').html() + '</div>');
        $('.sectionDesc .dop').html($el.find('.text span.current').html());
        setTimeout(function () {
            $('.sectionTitle,.sectionDesc').addClass('pushed');
            var left_url = $('#bg_left_' + ($el.index() + 1)).attr('src');
            //var right_url = $('#bg_right_' + ($el.index() + 1)).attr('src');
            $('.leftBg .newImage').css('background-image', 'url(' + left_url + ')');
            //$('.rightBg .newImage').css('background-image', 'url(' + right_url + ')');
            $('.bgBlock').addClass('pushed');
            setTimeout(function () {
                var left_url = $('#bg_left_' + ($el.index() + 1)).attr('src');
                //var right_url = $('#bg_right_' + ($el.index() + 1)).attr('src');
                $('.leftBg .newImage').css('background-image', 'url(' + left_url + ')');
                //$('.rightBg .newImage').css('background-image', 'url(' + right_url + ')');
                //$('.rightBg').data('num', ($el.index() + 1));
                $('.sectionTitle,.sectionDesc').removeClass('pushed');


                var link = $(document.createElement('a'));
                link.attr('href', $el.find('.title').data('url'));
                link.html($el.find('.title').html());
                $('.sectionTitle div').html(link);
                $('.sectionDesc div').html($el.find('.text span.current').html());
                textAnimationTimeout = setTimeout(function () {
                    textAnimation();
                }, 2350);
            }, 400);
        }, 10);

        clearTimeout(mainClickTimeout);
        // [switch to next element] timeout is calculated based on
        // number of <span> items inside currently active div multiplied by duration
        var count = e.target.children[1].children.length;
        mainClickTimeout = setTimeout(function () {
            mainClickAnimate();
        }, count * 2650)
    });

    /*$(document).on('click', '.rightBg .arrow', function (e) {
        e.preventDefault();
        var arrow = $(e.currentTarget),
            num = $('.rightBg').data('num');
        if (arrow.hasClass('next')) {
            if (num < 4) {
                num++;
            } else {
                num = 1;
            }
        } else {
            $('.rightBg').addClass('fromBottom');
            if (num > 1) {
                num--;
            } else {
                num = 4;
            }
        }*/
        //setTimeout(function () {
            //$('.newImage').css('background-image', 'url(' + baseUrl + '/img/home/bg/right-' + num + '.jpg)');
            //$('.rightBg').addClass('pushed');
            /*setTimeout(function () {
                $('.rightBg').removeClass('pushed fromBottom');
                $('.rightBg').css('background-image', 'url(' + baseUrl + '/img/home/bg/right-' + num + '.jpg)');
                $('.rightBg').data('num', num);
            }, 300);
        }, 1);*/
        //return false;
    //});

    $(document).on('click', '.menuTrigger', function (e) {
        e.preventDefault();
        $('body').toggleClass('showMenu');
        return false;
    });

    if ($('.panzoom').length) {
        $('.panzoom').panzoom({
            $zoomIn: $(".zoom-in"),
            $zoomOut: $(".zoom-out"),
            $zoomRange: $(".zoom-range"),
            // $reset: $(".reset"),
            minScale: 1,
            maxScale: 4,
            increment: 0.5,
            rangeStep: 0.5,
            contain: 'invert'
        });
    }


    $(document).on('click', '.zoomImgWrapper .galleryImage', function (e) {
        e.preventDefault();
        var active = $(e.currentTarget).parents('.zoomImgWrapper').find('.active');
        var next = active.next();
        if (!next.length) {
            next = $(e.currentTarget).parents('.zoomImgWrapper').find('.galleryImage').first();
        }
        active.removeClass('active');
        next.addClass('active');
        return false;
    })
});

$(window).load(function () {
    $('.main .numbers a').first().trigger('click');

    $('header,footer,.vacanciesBtn').addClass('loaded');
});
