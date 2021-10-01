jQuery(function ($) {
    $(document).ready(function () {
        //set plugins for date
        if($.fn.datepicker){
            $('.date-picker').datepicker({
                language: "ru",
                startView: 2,
            });
        }
        if($.fn.inputmask){
            $('.date-picker').inputmask({
                alias: "datetime",
                inputFormat: "dd.mm.yyyy",
                placeholder: "00.00.0000"
            });
        }
        let loginForm = $('.send-form').find('form');
        loginForm.submit(function (e) {
           return validForm();
        });
        $('input').change(function(e){
            if(validForm()){
                $(this).parents('form').find('.btn-submit').addClass('active');
            }
        });
        if(validForm()){
            $('form').find('.btn-submit').addClass('active');
        }
        if($('.text-popUp').length > 0){
            setTimeout(function(){ $('.text-popUp').fadeOut(300); }, 3000);
        }
        function validForm(){
            var erroreArrayElemnts = [];
            var el = loginForm.find('[data-reqired]');
            for (let i = 0; i < el.length; i++) {
                if(el[i].type === 'checkbox'){
                    if(el[i].checked == false){
                        erroreArrayElemnts.push(el[i]);
                        // $(el[i]).parents('.radio-input').addClass('has-error');
                        // $(el[i]).change(function (e) {
                        //     $(el[i]).parents('.radio-input').removeClass('has-error');
                        // });
                    }
                } else {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        erroreArrayElemnts.push(el[i]);
                        // $(el[i]).parents('.login-input').addClass('has-error');
                        // $(el[i]).focus(function (e) {
                        //     $(el[i]).parents('.login-input').removeClass('has-error');
                        // });
                    }
                }
            }
            if(erroreArrayElemnts.length > 0){
                return false;
            }
            else {
                return true;
            }
        }
        // preloader
        $('.load-wrapper').fadeOut();
    });
});