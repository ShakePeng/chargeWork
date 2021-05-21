function loadFn() {
    let loadItem = $('.loading');
    window.onload = function(){
        setInterval(function () {
            loadItem.css({ opacity: 0 })
            setInterval(function () {
                loadItem.addClass('none')
            }, 200)
        }, 1000);
    }
}

function bannerFn(){
    let head = $('header');
    let bodyHeight = $('body').height();
    $('.head-icon').on('click',function(){
        head.toggleClass('banAt');
        $('body').toggleClass('overHidden');
    });
    $('.banList').css({height:bodyHeight +'px'});

}

function scrollFn(){
    let header = $('header');

    let jjItem1 = $('.jjItem').eq(0).length > 0 ? $('.jjItem').eq(0).offset().top - 700 : 0;
    let jjItem2 = $('.jjItem').eq(1).length > 0 ? $('.jjItem').eq(1).offset().top - 700 : 0;
    let jjItem3 = $('.jjItem').eq(2).length > 0 ? $('.jjItem').eq(2).offset().top - 700 : 0;
    let change = $('.change').length > 0 ? $('.change').offset().top - 400 : 0;
    let join = $('.join').length > 0 ? $('.join').offset().top - 400 : 0;

    let item2 = $('.item2').eq(1).length > 0 ? $('.item2').eq(1).offset().top - 400 : 0;
    let item3 = $('.item2').eq(2).length > 0 ? $('.item2').eq(2).offset().top - 400 : 0;

    let descItem1 = $('.desc-item').eq(0).length > 0 ? $('.desc-item').eq(0).offset().top - 700 : 0;
    let descItem2 = $('.desc-item').eq(1).length > 0 ? $('.desc-item').eq(1).offset().top - 700 : 0;
    let descItem3 = $('.desc-item').eq(2).length > 0 ? $('.desc-item').eq(2).offset().top - 700 : 0;

    $(window).on('scroll', function () {
        let scrollTop = $(window).scrollTop();

        if(scrollTop > 100){
            header.addClass('headBg');
        }else{
            header.removeClass('headBg');
        }

        if(scrollTop >= jjItem1){
            $('.jjItem').eq(0).addClass('anim-bottom');
        }
        if(scrollTop >= jjItem2){
            $('.jjItem').eq(1).addClass('anim-bottom');
        }
        if(scrollTop >= jjItem3){
            $('.jjItem').eq(2).addClass('anim-bottom');
        }
        if(scrollTop >= change){
            $('.change').addClass('anim-bottom');
        }
        if(scrollTop >= join){
            $('.join').addClass('anim-bottom');
        }
        if(scrollTop >= item2){
            $('.item2').eq(1).addClass('anim-bottom');
        }
        if(scrollTop >= item3){
            $('.item2').eq(2).addClass('anim-bottom');
        }
        if(scrollTop >= descItem1){
            $('.desc-item').eq(0).addClass('anim-bottom');
        }
        if(scrollTop >= descItem2){
            $('.desc-item').eq(1).addClass('anim-bottom');
        }
        if(scrollTop >= descItem3){
            $('.desc-item').eq(2).addClass('anim-bottom');
        }
    });
}

function footerFn(){
    $('footer .list').on('click',function(){
        $(this).toggleClass('over');
    })
}

function videoFn(){
    $('.videoItem').on('click',function(){
        $('.video').removeClass('none');
        $('.video-item')[0].play();
    })
    $('.video').on('click',function(){
        $('.video-item')[0].pause();
        $('.video').addClass('none');
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

		if(name != '' && phone != '' && phone.length == 11){
			$.ajax({
				url: '/api/applyShop.json',
				type:'post',
                dataType:'json',
				data:{
					name : '',
					applicant : name,
					phone : phone,
					address : address,
					applyInstruction: ''
				},
				success: function(data){
					if(data.stauts == 200){
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

function init(){
    $('html').css({'font-size':'25px'});
    loadFn();
    bannerFn();
    scrollFn();
    footerFn();

    videoFn();
    loginFn();
    submit();
}
init();