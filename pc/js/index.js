function bannerFn() {
    let banItem = $('.banner li')
    let indexItem = $('.banner .at')
    let banLine = $('.ban-line')
    let moveLeft = getLeft(indexItem)
    banLine.css({ left: moveLeft + 'px' })

    banItem.on('mousemove', function () {
        let moveLeftItem = getLeft($(this))
        banLine.css({ left: moveLeftItem + 'px' })
    })

    $('.ban-out').on('mouseleave', function () {
        banLine.css({ left: moveLeft + 'px' })
    })
}
function getLeft(item) {
    let outLeft = item.position().left
    let itemWidth = item.width() / 2 - 14
    let moveLeft = outLeft + itemWidth
    return moveLeft
}

function loadFn() {
    let loadItem = $('.loading')
    window.onload = function () {
        setInterval(function () {
            loadItem.css({ opacity: 0 })
            setInterval(function () {
                loadItem.addClass('none')
            }, 200)
        }, 1000)
    }
}

function scrollFn() {
    let winHeight = $('body').height();
    let descTop = $('.desc').length > 0 ? $('.desc').offset().top - 500 : 0;
    let descItem = $('.desc-item');

    let mdTop = $('.md-txt2').length > 0 ? $('.md-txt2').offset().top - 500 : 0;
    let mdTxt = $('.md-txt2');
    let login = $('.login');

    let dt1 = $('.dt-list').eq(1).length > 0 ? $('.dt-list').eq(1).offset().top - 700 : 0;
    let dt2 = $('.dt-list').eq(2).length > 0 ? $('.dt-list').eq(2).offset().top -700 : 0;

    let md2 = $('.cp-con').eq(1).length > 0 ? $('.cp-con').eq(1).offset().top -700 : 0;
    let md3 = $('.cp-con').eq(2).length > 0 ? $('.cp-con').eq(2).offset().top -700 : 0;

    let sy2 = $('.layout2').eq(0).length > 0 ? $('.layout2').eq(0).offset().top -700 : 0;
    let sy3 = $('.layout2').eq(1).length > 0 ? $('.layout2').eq(1).offset().top -700 : 0;
    let sy4 = $('.layout2').eq(2).length > 0 ? $('.layout2').eq(2).offset().top -700 : 0;
    let sy5 = $('.change').length > 0 ? $('.change').offset().top -700 : 0;
    $(window).on('scroll', function () {
        let scrollTop = $(window).scrollTop();
        // 首页
        if(scrollTop >= sy2){
            $('.layout2 .left').eq(0).addClass('anim-left');
            $('.layout2 .right').eq(0).addClass('anim-right');
        }
        if(scrollTop >= sy3){
            $('.layout2 .left').eq(1).addClass('anim-left');
            $('.layout2 .right').eq(1).addClass('anim-right');
        }
        if(scrollTop >= sy4){
            $('.layout2 .left').eq(2).addClass('anim-left');
            $('.layout2 .right').eq(2).addClass('anim-right');
        }
        if(scrollTop >= sy5){
            $('.change .change-txt').addClass('anim-up');
            $('.change .change-item').addClass('anim-bottm');
        }
        // 产品介绍
        if(scrollTop >= md2){
            $('.cp-con img').eq(1).addClass('anim-right');
            $('.cp-con .con-item').eq(1).addClass('anim-left');
        }
        if(scrollTop >= md3){
            $('.cp-con img').eq(2).addClass('anim-left');
            $('.cp-con .con-item').eq(2).addClass('anim-right');
        }

        //  门店动态
        if(scrollTop >= dt1){
            $('.dt-txt',$('.dt-list').eq(1)).addClass('anim-left');
            $('img',$('.dt-list').eq(1)).addClass('anim-right');
        }
        if(scrollTop >= dt2){
            $('.dt-txt',$('.dt-list').eq(2)).addClass('anim-right');
            $('img',$('.dt-list').eq(2)).addClass('anim-left');
        }
        // 门店入驻
        if(scrollTop >= mdTop){
            mdTxt.addClass('anim-up');
            login.addClass('anim-bottm');
        }
        // 关于我们
        if (scrollTop >= descTop) {

            descItem.eq(0).addClass('anim-bottm');
            setInterval(function () {
                descItem.eq(1).addClass('anim-bottm')
                setInterval(function () {
                    descItem.eq(2).addClass('anim-bottm')
                }, 500)
            }, 500)
        }
    })
}

function loginFn(){
    $('.login-item input').each((index,e)=>{
        let uFa = $(e).parent('.login-item');
        $(e).on('focus',()=>{
            uFa.addClass('at');
        });
        $(e).on('blur',()=>{
            if(e.value == ''){
                uFa.removeClass('at');
            }
        });
    })
}
function submit(){
	$('.submit').click(()=>{
		let name = $('.login-item input[data-type=name]').val().trim();
		let phone = $('.login-item input[data-type=phone]').val().trim();
		let address = $('.login-item input[data-type=address]').val().trim();

		let params = {
            name : '',
            applicant : name,
            phone : phone,
            address : address,
            applyInstruction: ''
        };

        if(name != '' && /^\d{11}$/.test(phone)){
            $.ajax({
                url: '/static-api/api/applyShop.json',
                type:'post',
                contentType: "application/json;charset=UTF-8",
                data:JSON.stringify(params),
				success: function(data){
					if(data.status == 200){
						toastFn('提交成功');
					}
					else{
						toastFn(data.statusmsg);
					}
				},
				error: function(){
					toastFn('请稍后重试')
				}
			})
		}
		else{
			toastFn('请填入姓名和正确的手机号');
		}
	})
}

function toastFn(txt){
    $('.toast-txt').html(txt);
    $('.toast').removeClass('none');
    setInterval(()=>{
        $('.toast').addClass('none');
    },3000);
}
function wechatFn(){
	let wechatBtn = $('.cp-contact');
	let wechatList = $('#wechatPop');
	let closePop = $('#closePop');

	wechatBtn.click(()=>{
		wechatList.toggleClass('none');
	});
	closePop.click(()=>{
		wechatList.toggleClass('none');
	});
}

function playVideo(){
    $('.video-btn').on('click',function(){
        $('.video').removeClass('none');
        $('.video-item')[0].play();
    });

    $('.video').on('click',function(){
        $('.video-item')[0].pause();
        $(this).addClass('none');
    });
}

function init() {
    loadFn();
    bannerFn();
    scrollFn();
    loginFn();
    submit();
    wechatFn();
    playVideo();
}
init()
