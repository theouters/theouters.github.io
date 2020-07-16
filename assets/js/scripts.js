
// Preload images

var images = new Array()
            function preload() {
                for (i = 0; i < preload.arguments.length; i++) {
                    images[i] = new Image()
                    images[i].src = preload.arguments[i]
                }
            }
            if (window.screen.width > 1000) {
                preload(
                    ""
                );
            }else{
                preload(
                    ""
                );
            }


$(document).ready(function(){

    $(".likeCount").each(function(){

        $.ajax({
              url: "/likeFunction/like.php",
              type: "post",
              context: $(this),
              data:{ displayLikes: true, objectId: $(this).parent().attr('id') },
              success: function(result){

                    $(this).append(result);

              }
        });

    var parent = $(this).parent();
    var id = parent.attr('id');

    if ($.cookie(id)) {
        parent.addClass('liked');
    }

    });

// Add like to server
        $(".likeHeart").click(function(){
            var id = $(this).attr('id');
            if (!$.cookie(id)) {
                $.ajax({
                      url: "/likeFunction/like.php",
                      type: "post",
                      context: $(this),
                      data:{ addLike: true, objectId: $(this).attr('id'), type: 'case' },
                      success: function(result){
                            $(this).children(":first").html(result);

                            var id = $(this).attr('id');

                            $.cookie(id, true, { expires: 60 });
                            $(this).addClass('liked');
                      }
                });
            }
    });


});



    var backgroundCount = 2;
    var bgInterval;
    $(window).load(function(){
        bgInterval = setInterval(toggleBackground, 8000);
    });

    var toggleBackground = function(){
        if(backgroundCount == 5){
                for(i=1;i<6;i++){
                    $('#newsBG'+i).animate({opacity: 0}, 800);
                }
                $('#newsBG'+backgroundCount).animate({opacity: 1}, 800);
                backgroundCount = 1;
        }else{
                for(i=1;i<6;i++){
                    $('#newsBG'+i).animate({opacity: 0}, 800);
                }
                $('#newsBG'+backgroundCount).animate({opacity: 1}, 800);
                backgroundCount++;
            }
    };

var navHomeY;
var winHeight;

var valignContent = function () {
// Make sections height of browser and
// vertically align content

    navHomeY = $('#navHome').offset().top;
    var winHeight = $(window).height();
    $('.winHeight').css("height", winHeight);

    $(".content").each(function () {
        var contHeight = $(this).height();

        // center content
        var padding = ((winHeight - contHeight) / 2.5);
        $(this).parent().css("padding-top", padding);
        // $('.headerSection').css("padding-top", padding);

        if (contHeight+100 > winHeight) {

            if ($(this).parent().hasClass('bgDiv')) {
                $(this).closest("section").css("height", contHeight + 100);
                $(this).parent().css("padding-top", 0);
            }else{
                $(this).parent().css("height", contHeight + 100);
                $(this).css("padding-top", 30);
            }
        }

    });


}; //valign function end

var maskPixelCounter = function(){

    var fixBottom = $(window).height() - 80;
        $('#pixelCounterWrapper').css('top', fixBottom);

        var labPosTransStop = $('#lab').position().top + 50;
        var labPosTransStopBottom = $('#lab').position().top + $('#lab').outerHeight() + 50;
        var pixelCounter = $('#pixelCounterWrapper');
        var pixelCounter2 = $('#pixelCounterWrapper2');
        var pixelCounterPos = $(document).scrollTop() + pixelCounter.position().top + pixelCounter.height();
        var pixelCounterPosTop = $(document).scrollTop() + pixelCounter.position().top + 50;
        var labPos = $('#lab').position().top;
        var currentBottom = $(document).scrollTop()+$(window).height();
        var labPosBottom = $('#lab').position().top + $('#lab').outerHeight();

        if (pixelCounterPosTop >= labPos && pixelCounterPosTop <= labPos+50) {
            // Minimize object

            var count = labPosTransStop - pixelCounterPosTop;
            var count2 =  50 - count;

            pixelCounter.css({'height': count, 'bottom': '', 'top': fixBottom});
            $('#pixelCounter').css({'top': 0, 'bottom': ''});


            pixelCounter2.css({'height': count2, 'bottom': '30px', 'top':''});
            $('#pixelCounter2').css({'top': '', 'bottom': 0});

        }
        else if(pixelCounterPosTop > labPos+50 && pixelCounterPosTop < labPosBottom)
        {
            // 100% collapse or expand, depending on choice. Collapse in this case.
            pixelCounter.css('height', 0);
            pixelCounter2.css('height', 50);
        }
        else if(pixelCounterPosTop >= labPosBottom && pixelCounterPosTop <= labPosBottom+50)
        {
            // Expand object

            var count = labPosTransStopBottom - pixelCounterPosTop;
            var count2 =  50 - count;

            pixelCounter.css({'height': count2, 'bottom': '30px', 'top': ''});
            $('#pixelCounter').css({'top': '', 'bottom': 0});


            pixelCounter2.css({'height': count, 'bottom': '', 'top': fixBottom});
            $('#pixelCounter2').css({'top': 0, 'bottom': ''});
        }
        else
        {
            pixelCounter.css('height', 50);
            pixelCounter2.css('height', 0);
        }


}; // maskpixelCounter end


var changeMenu = function(){
    var locations = [];
    $("nav ul li a").each(function() {
        locations.push($(this).attr("href"));
    });

        $("nav a").removeClass();
        $("#mobileNav a").removeClass();

    $.each(locations, function(index, value) {
        var scroll = $(window).scrollTop();
        var topPos = $(value).position().top;
        var sectionHeight = $(value).outerHeight();
        var winHeight = $(window).height();
        var scrollMargin = -45;
        var selected = ( "#m" + ( index + 1) );
        var selectedMob = ( "#mm" + ( index + 1) );

            if (scroll >= topPos + scrollMargin && scroll < topPos + sectionHeight + scrollMargin){
                $(selected).addClass('selected');
                $(selectedMob).addClass('selectedMob');
                // $("nav").removeClass('white');
                // $("nav").removeClass('yellow');
                // $("nav").removeClass('start');

                // if background is white
                if(value !== "#start" && value !== "#news"){
                    $("nav").addClass('white');

                // if background is yellow
                }else if(value == "#lab"){
                    //$("nav").addClass('yellow');
                }else if(value == "#start"){
                    $("nav").addClass('start');
                }else if(value == "#news"){
                    $("nav").addClass('start');
                    $("nav").removeClass('white');
                }
            }

    }); // each end
}; // changeMenu end

var isFixed = false;
var shouldBeFixed;
var nav;
var fixMenu = function (){

    nav = $('nav');

        shouldBeFixed = $(window).scrollTop() > navHomeY;


        if( shouldBeFixed && !isFixed){
        nav.css({
                    position: 'fixed',
                    top: 0,
                    left: nav.offset().left
                });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed)
        {
            nav.css({
                position: 'static'
            });
            isFixed = false;
        }
};




$(window).load(function(){
    // $('body').scrollTop(1);
    $('.downArrow').slideDown(2500);
    changeMenu();
    fixMenu();
    valignContent();
    maskPixelCounter();
}); //window.load end


// Change sections height on browser resize
$(window).resize(function() {
    console.log(navHomeY);
    valignContent();
    changeMenu();
    fixMenu();

    maskPixelCounter();

    // Prevent anythingSlider from flickering on resize
    if(Modernizr.touch) {

    }else{
        $('.anythingSlider').stop().hide().delay(200).fadeIn(200);
    }
}); //resize function end


// Get position and change menu from that
$(window).scroll(function() {

maskPixelCounter();
changeMenu();
fixMenu();

}); //scroll end

$(document).ready(function(){


// Chart, pixelcounter
            $(window).scroll(function(){


            var scrolled = $(window).scrollTop();
            var total = $(document).height();
            var rest = total - scrolled - $(window).height();



            // $('#pixelText').html("<p>"+scrolled+" scrollade pixlar</p>");

            var data = [
        { label: "Scrolled",  data: scrolled, color: 'rgb(200, 200, 200)'},
        { label: "Left",  data: rest, color: 'transparent'}
    ];
    // DEFAULT
    $.plot($("#pixelCounter"), data,
    {
        series: {
            pie: {
                radius: 0.8,
                show: true,
                label: {
                    show: false
                },
                stroke: {
                    color: "#111",
                    width: "1"
                }
            }
        },
        legend: {
            show: false
        }

    });

    var data2 = [
        { label: "Scrolled",  data: scrolled, color: 'rgb(244, 170, 0)'},
        { label: "Left",  data: rest, color: 'transparent'}
    ];
    $.plot($("#pixelCounter2"), data2,
    {
        series: {
            pie: {
                radius: 0.8,
                show: true,
                label: {
                    show: false
                },
                stroke: {
                    color: "#111",
                    width: "1"
                }
            }
        },
        legend: {
            show: false
        }

    });

}); //Pixelcounter end



    // Scroll to content on link click
    $("nav a").on('click touchend', function(event) {
        event.preventDefault();
        var destination = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(destination).offset().top
                 }, 1000);
    }); // nav a.click end
    $("#mobileNav ul li").on('click touchend', function(event) {
        event.preventDefault();
        var destination = $(this).children('a').attr('href');
            $('html, body').animate({
                scrollTop: ($(destination).offset().top - 40)
                 }, 1000);
    }); // nav a.click end

    $(".rotateArrow").on('click touchend', function(event) {
        $('html, body').animate({
                    scrollTop: $("#news").offset().top
                     }, 1000);
    });

    $("#menuLabel").on('click touchstart', function(event) {

        $("#mobileNav ul li").slideToggle();
        return false;
    });
    $("#mobileNav ul li").on('click touchstart', function(event) {
        if($('#menuLabel').is(':visible')){
            $("#mobileNav ul li").toggle();
        return false;
        }
    });


$(window).load(function(){

    // Animate heart

    $('.yellowHeart').bind('inview', function (event, visible) {
        if (visible === true) {
            $('.yellowHeart').stop(true, true)
            .delay(2000)
            .animate({width: '44', left: '0', right: '0'}, 30)
            .delay(200)
            .animate({width: '40', left: '2', right: '2'}, 100)
            .delay(1000)
            .animate({width: '44', left: '0', right: '0'}, 30)
            .delay(200)
            .animate({width: '40', left: '2', right: '2'}, 100);
        } else {

        }
    }); // heart.bind end

    // Animate lab bubbles
        var fired = false;
        $('.labHeading').bind('inview', function (event, visible) {
        if (visible === true) {

                // if (!fired) {
                //     fired = true;

                    $('.labBubble1').stop().delay(1300).animate({ opacity: 1, top: '-30' }, 500);
                    $('.labBubble2').stop().delay(1200).animate({ opacity: 1, top: '-45' }, 300);
                    $('.labBubble3').stop().delay(800).animate({ opacity: 1, top: '-70' }, 800);
                // }
        } else {
                    $('.labBubble1').stop().delay(0).animate({ opacity: 0, top: '0' }, 800);
                    $('.labBubble2').stop().delay(200).animate({ opacity: 0, top: '-15' }, 800);
                    $('.labBubble3').stop().delay(300).animate({ opacity: 0, top: '-40' }, 800);
        }
    }); // labIcon.bind end



// Menu underline
    var magicLine = $("#underline");

    magicLine
        .width($(".selected").width())
        .css("left", $(".selected").position().left)
        .data("origLeft", magicLine.position().left)
        .data("origWidth", magicLine.width());

        $("nav a").hover(function() {
            $el = $(this);

            leftPos = $el.position().left;
            newWidth = $el.parent().width();
            magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            }, 400);
        }, function() {
            magicLine.stop().animate({
                left: magicLine.data("origLeft"),
                width: magicLine.data("origWidth")
            }, 400);
    });



    $(window).scroll(function(){
        var magicLine = $("#underline");

        // .filter(':not(:animated)')
                magicLine.stop()
                .animate({
                    width: $(".selected").width(),
                    left: $(".selected").position().left
                        }, 0, function(){
                            magicLine
                    .data("origLeft", magicLine.position().left)
                    .data("origWidth", magicLine.width());
        });

    }); // window.scroll end
    $(window).resize(function(){
        var magicLine = $("#underline");

// .filter(':not(:animated)')
        magicLine.stop()
        .animate({
            width: $(".selected").width(),
            left: $(".selected").position().left
                }, 0, function(){
                    magicLine
            .data("origLeft", magicLine.position().left)
            .data("origWidth", magicLine.width());
});

    }); // window.resize end
    // Menu underline end
});



}); // document.ready end
$(window).load(function(){
    $('body').css('visibility', 'visible');
});
