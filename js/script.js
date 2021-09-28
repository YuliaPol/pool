
jQuery(function ($) {
    $(document).ready(function () {
        $('.mobile-menu').click(function(e){
            $(this).toggleClass('open');
            $('.main-panel').toggleClass('open');
        });
    });
});