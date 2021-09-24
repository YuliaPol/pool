jQuery(function ($) {
    $(document).ready(function () {
        let loginForm = $('.login-form').find('form');
        loginForm.submit(function (e) {
            var erroreArrayElemnts = [];
            var el = loginForm.find('[data-reqired]');
            for (let i = 0; i < el.length; i++) {
                if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                    erroreArrayElemnts.push(el[i]);
                    $(el[i]).parents('.login-input').addClass('has-error');
                    $(el[i]).focus(function (e) {
                        $(el[i]).parents('.login-input').removeClass('has-error');
                    });
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