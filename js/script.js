
jQuery(function ($) {
    $(document).ready(function () {
        $('.mobile-menu').click(function(e){
            $(this).toggleClass('open');
            $('.main-panel').toggleClass('open');
        });
        $(document).click(function(event) { 
            var $target = $(event.target);
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
        $('.center-content').on('click', '.data-item .text-value', function(e){
            $(this).fadeOut(0);
            $(this).next('.input-value').fadeIn(300);
            $(this).next('.input-value').find('input').focus();
        });
        $('.center-content').on('focusout', '.data-item .input-value input', function(e){
            if(!$(this).hasClass('date-picker')){
                hideInput(this);
            } else if($(this).hasClass('date-picker') && !$('.datepicker-dropdown').is(':visible')) {
                hideInput(this);
            }
        });
        $('.center-content').on('change', '.data-item .input-value select', function(e){
            hideInput(this);
        });
        function hideInput(thieEl){
            $(thieEl).parents('.input-value').fadeOut(0);
            let text = $(thieEl).val();
            $(thieEl).parents('.input-value').prev('.text-value').html(text);
            $(thieEl).parents('.input-value').prev('.text-value').fadeIn(300);
        }
        if($.fn.inputmask){
            $('.date-picker').inputmask({
                alias: "datetime",
                inputFormat: "dd.mm.yyyy",
                placeholder: "00.00.0000"
            });
        }
        //set plugins for date
        if($.fn.datepicker){
            $('.date-picker').datepicker({
                language: "ru",
                startView: 2,
            });
        }
        // preloader
        $('.load-wrapper').fadeOut();
    });
});