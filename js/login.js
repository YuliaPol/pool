jQuery(function ($) {
    $(document).ready(function () {
        let loginForm = $('.send-form').find('form');
        loginForm.submit(function (e) {
            var erroreArrayElemnts = [];
            var el = loginForm.find('[data-reqired]');
            for (let i = 0; i < el.length; i++) {
                if(el[i].type === 'checkbox'){
                    if(el[i].checked == false){
                        erroreArrayElemnts.push(el[i]);
                        $(el[i]).parents('.radio-input').addClass('has-error');
                        $(el[i]).change(function (e) {
                            $(el[i]).parents('.radio-input').removeClass('has-error');
                        });
                    }
                } else {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        erroreArrayElemnts.push(el[i]);
                        $(el[i]).parents('.login-input').addClass('has-error');
                        $(el[i]).focus(function (e) {
                            $(el[i]).parents('.login-input').removeClass('has-error');
                        });
                    }
                }
            }
            if(erroreArrayElemnts.length > 0){
                return false;
            }
            else {
                return true;
            }
        });
    });
});