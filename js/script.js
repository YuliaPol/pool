
jQuery(function ($) {
    $(document).ready(function () {
        $('.mobile-menu').click(function(e){
            $(this).toggleClass('open');
            $('.main-panel').toggleClass('open');
        });
        $(document).click(function(event) { 
            var $target = $(event.target);
            console.log($target);
            console.log($target.closest('.mobile-menu'));
            console.log($target.closest('.left-side'));
            if(!$target.closest('.left-side').length && $('.main-panel').hasClass('open')){
                $('.main-panel').removeClass('open');
                $('.mobile-menu').removeClass('open');
            }       
        });
        $('.center-content').on('mouseover ', '.show-pool.inactive', function(e){
            $(this).parents('.pool-item').addClass('hovered');
            $('.btn-putInfo').addClass('shadowed');
        });
        $('.center-content').on('mouseout ', '.show-pool.inactive', function(e){
            $(this).parents('.pool-item').removeClass('hovered');
            $('.btn-putInfo').removeClass('shadowed');
        });
        $('.show-pool')
        // preloader
        $('.load-wrapper').fadeOut();
    });
});