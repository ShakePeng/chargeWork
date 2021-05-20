function bannerFn(){
    let head = $('header');
    $('.head-icon').on('click',function(){
        head.toggleClass('banAt');
    });
}

function scrollFn(){
    let header = $('header');

    $(window).on('scroll', function () {
        let scrollTop = $(window).scrollTop();

        if(scrollTop > 100){
            header.addClass('headBg');
        }else{
            header.removeClass('headBg');
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
    })
    $('.video').on('click',function(){
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

		if(name != '' && phone != ''){
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
			toastFn('请填入姓名和手机号');
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
    bannerFn();
    scrollFn();
    footerFn();

    videoFn();
    loginFn();
    submit();
}
init();