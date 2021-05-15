function bannerFn(){
    let banItem = $('.banner li');
    let indexItem = $('.banner .at');
    let banLine = $('.ban-line');
    let moveLeft = getLeft(indexItem);
    banLine.css({left:moveLeft+'px'});

    banItem.on('mousemove',function(){
        let moveLeftItem = getLeft($(this));
        banLine.css({left:moveLeftItem+'px'});
    })

    $('.ban-out').on('mouseleave',function(){
        banLine.css({left:moveLeft+'px'});
    })
}
function getLeft(item){
    let outLeft = item.position().left;
    let itemWidth = item.width() / 2 - 14;
    let moveLeft = outLeft + itemWidth;
    return moveLeft;
}

function loadFn(){
    let loadItem = $('.loading');
    window.onload = function(){
        setInterval(function(){
            loadItem.css({opacity:0});
            setInterval(function(){
                loadItem.addClass('none');
            },200);
        },1000);
    }
}

function init(){
    loadFn();
    bannerFn();
}
init();