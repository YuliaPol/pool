
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
        $('.center-block').on('mouseover ', '.inactive .start-pool', function(e){
            console.log(e);
            // $(this).parents('.pool-item').addClass('hovered');
            $('.btn-putInfo').addClass('shadowed');
        });
        $('.center-block').on('mouseout ', '.inactive .start-pool', function(e){
            // $(this).parents('.pool-item').removeClass('hovered');
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

        //progress circle for pool
        let progress = $('.progress-cirlce');
        for (let i = 0; i < progress.length; i++) {
            var percentageComplete = parseInt($(progress[i]).attr('data-percent'))/100;
            var strokeDashOffsetValue = 100 - (percentageComplete * 100);
            var progressBar = $(progress[i]).find('.js-progress-bar');
            progressBar.css('stroke-dashoffset', strokeDashOffsetValue);
        }

        // owl carousel for unfinished pools
        if($.fn.owlCarousel){
            let wysiwyg_owloptions = {
                items: 1,
                margin: 0,
                loop: true,
                center: true,
                stagePadding: 0,
                nav: false,
                lazyLoad: true,
                autoHeight : true,
                dots: false,
            }
            // $('.unfinished-pools-list').owlCarousel(
            //     wysiwyg_owloptions
            // );
            var owl = $('.unfinished-pools-list').owlCarousel(wysiwyg_owloptions);;
            owlResize(owl);
            let widthOwlItem = $('.unfinished-pools-list').find('.owl-item.active').width();
            $('.unfinished-pools-list').css( "maxWidth", widthOwlItem + "px" );
            $('.unfinished-pools-block').on('click', '.btn-prev', function(e){
                owl.trigger('prev.owl.carousel');
            });
            $('.unfinished-pools-block').on('click', '.btn-next', function(e){
                owl.trigger('next.owl.carousel');
            });

            function owlResize($owl) {
                $owl.trigger('destroy.owl.carousel');
                $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
                $owl.owlCarousel(wysiwyg_owloptions);
            }

            $( window ).resize(function() {
                
            });
        }

        //faq block
        $('.show-faq-block').click(function(e){
            $(this).parent().fadeOut(0);

            $('.left-side').find('.faq-block').addClass('visible');
        });

        //autoheight for message in chat
        $(".chat-wrapper textarea").each(function () {
            this.setAttribute("style", "height:" + (this.scrollHeight) + "px;");
        }).on("input", function () {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + 2 + "px";
        });

        //acpant chat
        $('.chat-wrapper').on('click', '.expand', function(e){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).parents('.chat-wrapper').removeClass('expanded');
                $(this).parents('.main-panel').find('.top-content').fadeIn(0);
            } else {
                $(this).addClass('active');
                $(this).parents('.main-panel').find('.top-content').fadeOut(0);
                $(this).parents('.chat-wrapper').addClass('expanded');
            }
        });
        $('.chat-wrapper textarea').keypress(function (e) {
            if (e.which == 13) {
                $('.chat-wrapper form').submit();
                return false;
            }
        });
        //show chat
        $('.left-side').on('click', '.show-chat', function(e){
            $(this).parents('.faq-block').fadeOut(0);
            $(this).parents('.left-side').find('.chat-wrapper').fadeIn(300);
        });

        // click on inactive btn
        $('.page-content').on('click', '.pool-item .inactive .start-pool', function(e){
            e.preventDefault();
        });
        
    });
});