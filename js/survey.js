jQuery(function ($) {
    $(document).ready(function () {
        jQuery.fn.scrollTo = function(elem, speed) { 
            $(this).animate({
                scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top  - 20
            }, speed == undefined ? 1000 : speed); 
            return this; 
        };
        //function for autoresize textarea
        $.fn.autoResize = function(){
            let r = e => {
                e.style.height = '';
                e.style.height = e.scrollHeight + 'px'
            };
            return this.each((i,e) => {
                e.style.overflow = 'hidden';
                r(e);
                $(e).bind('input', e => {
                    r(e.target);
                })
            })
        };
        //local settings for datepicker
        $.datepicker.setDefaults({
            closeText: 'Закрыть',
            prevText: '',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        });
        // Restricts input for the set of matched elements to the given inputFilter function.
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        };
        //auto height for textarea
        $('.pool-wrap textarea').autoResize();

        //in free list answers add new textarea
        $('.pool-wrap').on('input', '.question-freedynamic textarea', function(e){
            let question = $(this).parents('.question-wrap');
            let text = $(this).val();
            let index = $(this).parents('.answer-wrap').index() + 1;
            let length = $(this).parents('.free-answers').children().length;
            if(text && index === length) {
                let indexNext = length + 1;
                let questionId = question.attr('data-id');
                let newTextareaHtml = 
                `<div class="answer-wrap">
                    <textarea rows="1" name="q-${questionId}-${indexNext}" placeholder="Введите ваш комментарий"></textarea>
                </div>`;
                $(newTextareaHtml).appendTo($(this).parents('.free-answers'));
            }
        });

        // free list remove textarea if empty
        $('.pool-wrap').on('blur', '.question-freedynamic textarea', function(e){
            let question = $(this).parents('.question-wrap');
            let text = $(this).val();
            let index = $(this).parents('.answer-wrap').index() + 1;
            let length = $(this).parents('.free-answers').children().length;
            if(!text && index !== length) {
                $(this).parents('.answer-wrap').remove();
                refreshFreeList(question);
            }
        });
        //refresh ids on free list
        function refreshFreeList(questin){
            let list = questin.find('.free-answers').children();
            for (let i = 0; i < list.length; i++) {
                let id = i + 1;
                let inputs = $(list[i]).find('textarea');
                changeNameInput(inputs, id, 2);
            }
        }
        //change id in inputs name
        function changeNameInput(inputs, id, position){
            for (let i = 0; i < inputs.length; i++) {
                if($(inputs[i]).attr('name')){
                    prevId = $(inputs[i]).attr('name').split("-");
                    if(prevId[position]){
                        prevId[position] = id;
                        newId = prevId.join('-');
                        $(inputs[i]).attr('name', newId);
                    }
                }
                if($(inputs[i]).attr('id')){
                    prevId = $(inputs[i]).attr('id').split("-");
                    if(prevId[position]){
                        prevId[position] = id;
                        newId = prevId.join('-');
                        $(inputs[i]).attr('id', newId);
                    }
                }
                if($(inputs[i]).attr('for')){
                    prevId = $(inputs[i]).attr('for').split("-");
                    if(prevId[position]){
                        prevId[position] = id;
                        newId = prevId.join('-');
                        $(inputs[i]).attr('for', newId);
                    }
                }
            }
            return true;
        }
        //dragable and sortable for ranging items
        function setSortbaleRanging(){
            $('.question-ranging .ranging-list').sortable({
                cancel: 'a,button, textarea, .empty-item',
                containment: '.ranging-list',
                cursor: 'grab',
            });
        }
        setSortbaleRanging();
        //settings for date question
        function setDatePicker(){
            $('.date-input').datepicker({
                gotoCurrent: true,
                showOtherMonths: false,
                altFormat: "mm.dd.yyyy",
                dateFormat: "mm.dd.yyyy",
                autoClose: true,
                onSelect: function(date, inst, obj){
                    let dateAnswer = obj.$el.parents('.date-answer')
                    if(dateAnswer.is(':last-child')){
                        dateAnswer.addClass('picked-date');
                        let removeHtml = `<div class="btn-remove-date"></div>`;
                        $(removeHtml).appendTo(dateAnswer);
                        let dateList = dateAnswer.parents('.data-list');
                        let inputId = dateList.length + 1;
                        let questionId = dateAnswer.parents('.question-wrap').attr('data-id');
                        let newInputHtml = 
                            `<div class="date-answer">
                                <input type="text" class="date-input" maxlength="10" name="q-${questionId}-${inputId}">
                                <div class="icon-date"></div>
                            </div>`
                        $(newInputHtml).appendTo(dateList);
                        setDatePicker();
                    }
                },
            });
        }
        setDatePicker();
        //delete date input
        $('.content-wrap').on('click', '.question-datedynamic .btn-remove-date', function(e){
            let question = $(this).parents('.question-wrap');
            $(this).parents('.date-answer').remove();
            refreshDatesIds(question);
        });
        function refreshDatesIds(question){
            let list = question.find('.data-list').children();
            for (let i = 0; i < list.length; i++) {
                let id = i + 1;
                let inputs = $(list[i]).find('input');
                changeNameInput(inputs, id, 2);
            }
        }
        //settings for phone question
        $('.question-phone input.code').intlTelInput({
            initialCountry: "ru",
        });
        //only number for phone
        $('.phone').inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99999999999);
        });
        //add icons and names of uploaded files 
        $('.pool-wrap').on('change', '.question-file input[type=file]', function(e){
            let files = this.files;
            let question = $(this).parents('.question-wrap');
            if(question.find('.uploaded-list').length === 0){
                let listHtml = `<div class="uploaded-list"></div>`
                $(listHtml).insertAfter($(this).parents('.file-answer'));
            }
            let filesWrap = question.find('.uploaded-list');
            let fileList = '';
            for (let i = 0; i < files.length; i++) {
                let fileName = files[i].name;
                let lastDot = fileName.lastIndexOf('.');
                let ext = fileName.substring(lastDot + 1);
                let iconClass = '';
                if(ext === 'doc' || ext === 'docx' || ext === 'dot' || ext === 'docm' || ext === 'dotx' || ext === 'dotm'){
                    iconClass = 'file-icon-word';
                } else if(ext === 'jpg' || ext === 'png' || ext === 'gif' || ext === 'jpg'
                    || ext === 'jpeg' || ext === 'webp' || ext === 'svg'){
                        iconClass = 'file-icon-img';
                } else if(ext === 'avi' || ext === 'mp4' || ext === 'webm' || ext === '3gp' || ext === '3gpp'
                    || ext === 'flv' || ext === 'm4v' || ext === 'mkv' || ext === 'mov' || ext === 'mpeg'
                    || ext === 'mpeg4' || ext === 'ogg' || ext === 'ogv' || ext === 'wmv'){
                        iconClass = 'file-icon-video';
                } else if(ext === 'wav' || ext === 'mp3' || ext === 'm4a' || ext === 'wma' || ext === 'flac' || ext === 'aiff'){
                    iconClass = 'file-icon-audio';
                } else if(ext === 'xlsx' || ext === 'xlsm' || ext === 'xltx' || ext === 'xls' || ext === 'xml'){
                    iconClass = 'file-icon-exel';
                } else if(ext === 'pdf'){
                    iconClass = 'file-icon-pdf';
                } else if(ext === 'pptx' || ext === 'pptm' || ext === 'pptm' || ext === 'ppt'){
                    iconClass = 'file-icon-pp';
                }
                let itemHtml = 
                    `<div class="file-item">
                        <div class="file-icon ${iconClass}"></div>
                        <div class="file-name">
                            ${fileName}
                        </div>
                    </div>`;
                fileList += itemHtml;
            }
            filesWrap.html(fileList);
        });
        //input diapason value
        $('.pool-wrap').on('input', '.question-wrap .input-range', function(e){
            setDiapasonValue(this);
        });
        //set width for input range background
        function setRangeBackground(){
            let ranges = $('.input-range');
            if(ranges.length > 0){
                for (let i = 0; i < ranges.length; i++) {
                    let barFilled = $(ranges[i]).parents('.question-wrap').find('.bar-filled');
                    let barLenght = $(ranges[i]).width();
                    console.log(barLenght);
                    barFilled.css('background-size', barLenght + 'px');
                }
            }
        }
        setRangeBackground();
        $( window ).resize(function() {
            console.log('resize');
            setRangeBackground();
        });
        //set new diapsson value
        function setDiapasonValue(input){
            var value = $(input).val();
            var max = $(input).attr('max');
            var min = $(input).attr('min');
            var range = max - min;
            var relvalue = value - min;
            var percent = (100/range)*relvalue;
            var parents = $(input).parents('.diapason');
            var paddleft = (30*percent)/100;
            parents.find('.label').css('left', 'calc(' + percent + '% - ' + paddleft + 'px)');
            parents.find('.label .value').html(value);
            parents.find('.input-box .bar-filled').css('width', percent + '%');
            parents.find('.label').css('background-position', percent + '%');
        };

        $('.pool-wrap .question-list').scroll(function(e){
            setScrollWisth();
        });
        function setScrollWisth(){
            let box = $('.pool-wrap .question-list');
            let curScroll = box.scrollTop();
            let scrolHeight = box[0].scrollHeight;
            let boxHeight = box[0].clientHeight;
            let boxScrollHeight = scrolHeight - boxHeight;
            let scrollWidth = Math.round((100/boxScrollHeight)*curScroll);
            if($('.preview-footer .proggres').length > 0){
                $('.preview-footer .proggres').css('width', scrollWidth + '%');
            }
            if($('.progress-bar .proggres')){
                $('.progress-bar .proggres').css('width', scrollWidth + '%');
            }
        }
        setScrollWisth();

        $('.pool-wrap').on('click', '.video-wrap video', function(e){
            e.preventDefault();
            let videoWrap = $(this).parent();
            let video = videoWrap.find('video').get(0);
            if(video.paused){
                $(video).prop('controls', true);
                video.play();
            } else {
                video.pause();
                $(video).prop('controls', false);
            }
        });

        $('.pool-wrap').on('click', '.question-wrap input[type=radio]', function(e){
            let $radio = $(this)
            if($radio.prop('checked')){
                let radioGroup = $radio.parents('.question-wrap');
                radioGroup.find('input[type=radio]').not($radio).prop('checked', false);
                if ($radio.attr('data-waschecked') == 'true') {
                    $radio.prop('checked', false);
                    $radio.parents('.question-wrap').find('input[type="radio"]').attr('data-waschecked', 'false');
                } else {
                    $radio.parents('.question-wrap').find('input[type="radio"]').attr('data-waschecked', 'false');
                    $radio.attr('data-waschecked', 'true');
                }
            } else {
                $radio.parents('.question-wrap').find('input[type="radio"]').attr('data-waschecked', 'false');
            }
        });

        //make audiowave
        $('.audiowave').each(function(){
            var path = $(this).attr('data-audiopath');//path for audio
            setAudioWave(this, path);
        });
        // wavesurfer for audio elements
        function setAudioWave(el, path){
            //Initialize WaveSurfer
            var wavesurfer = WaveSurfer.create({
                container: el,
                scrollParent: false,
                backgroundColor: '#FFFFFF',
                height: 40,
                barMinHeight: 1,
                barWidth: 1.5,
                cursorWidth: 0,
                barGap: 1.5,
                waveColor: '#E5E5E5',
                hideScrollbar: true,
                progressColor: "#000000"
            });

            //Load audio file
            wavesurfer.load(path);

            // Show video duration
            wavesurfer.on('ready', function () {
                $(el).parents('.audio-wrap').find('.audio-duration').html(formatTime(wavesurfer.getDuration()));
            });

            wavesurfer.on('pause', function () {
                $(el).parents('.audio-wrap').find('.audio-control').removeClass('pause');
            });

            wavesurfer.on('play', function () {
                $(el).parents('.audio-wrap').find('.audio-control').addClass('pause');
            });
            //Add button event
            $(el).parents('.audio-wrap').find('.audio-control').click(function(){
                wavesurfer.playPause();
            });
        }

        
        //validation
        var formValid = document.getElementsByClassName('form-valid')[0];
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var el = document.querySelectorAll('.form-valid [data-reqired]');
                var erroreArrayElemnts = [];
                for (var i = 0; i < el.length; i++) {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        if($(el[i]).parents('.question-wrap').is(':visible')){
                            erroreArrayElemnts.push(el[i]);
                            if($(el[i]).attr('type')=='text' || $(el[i]).attr('type')=='tel' || $(el[i]).attr('type')=='email' || el[i].tagName === 'TEXTAREA'){
                                $(el[i]).parents('.question-wrap').addClass('has-error');
                            }
                            $(el[i]).focus(function (e) {
                                $(e.target).parents('.question-wrap').removeClass('has-error');
                            });
                        }
                    }
                }

                var el = document.querySelectorAll('.form-valid input[type="radio"][data-reqired=reqired]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'INPUT') {
                        var name = el[i].getAttribute('name');
                        if (document.querySelectorAll('[name=' + name + ']:checked').length === 0) {
                            if($(el[i]).parents('.question-wrap').is(':visible')){
                                erroreArrayElemnts.push(el[i]);
                                if($(el[i]).parents('.question-wrap')){
                                    $(el[i]).parents('.question-wrap').addClass('has-error');
                                }
                                var inputname = $(el[i]).attr('name');
                                $('input[name='+ inputname + ']').change(function (e) {
                                    $(e.target).parents('.question-wrap').removeClass('has-error');
                                });
                            }
                        }
                    }
                }

                var el = document.querySelectorAll('.form-valid input[type="checkbox"][data-reqired=reqired]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'INPUT') {
                        var parents = $(el[i]).parents('.question-wrap');
                        if ($(parents).find('input[type=checkbox]:checked').length === 0) {
                            if($(el[i]).parents('.question-wrap').is(':visible')){
                                erroreArrayElemnts.push(el[i]);
                                if($(el[i]).parents('.question-wrap')){
                                    $(el[i]).parents('.question-wrap').addClass('has-error');
                                }
                                var inputparent = $(el[i]).parents('.question-wrap');
                                $(inputparent).on('change', 'input[type=checkbox]', function (e) {
                                    $(e.target).parents('.question-wrap').removeClass('has-error');
                                });
                            }
                        }
                    }
                }

                var el = document.querySelectorAll('.form-valid input[type="range"][data-reqired=reqired]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'INPUT') {
                        var valueRange = $(el[i]).parents('.range').find('.label .value').html();
                        if (valueRange === '' || valueRange === ' ' || valueRange === '-') {
                            if($(el[i]).parents('.question-wrap').is(':visible')){
                                erroreArrayElemnts.push(el[i]);
                                $(el[i]).parents('.question-wrap').addClass('has-error');
                                var inputname = $(el[i]).attr('name');
                                $('input[name='+ inputname + ']').change(function (e) {
                                    $(e.target).parents('.question-wrap').removeClass('has-error');
                                });
                            }
                        }
                    }
                }

                var el = document.querySelectorAll('.form-valid select[data-reqired=reqired]');
                for (var i = 0; i < el.length; i++) {
                    if (el[i].tagName === 'SELECT') {
                        if (!$(el[i]).val()) {
                            if($(el[i]).parents('.question-wrap').is(':visible')){
                                erroreArrayElemnts.push(el[i]);
                                $(el[i]).parents('.question-wrap').addClass('has-error');
                                $(el[i]).change(function (e) {
                                    $(e.target).parents('.question-wrap').removeClass('has-error');
                                });
                            }
                        }
                    }
                }

                if (erroreArrayElemnts.length == 0) {
                    formValid.submit();
                }
                if (erroreArrayElemnts.length > 0) {
                    console.log('Valid error');
                    erroreArrayElemnts.sort(function(a, b){
                        return parseInt($(a).parents('.question-wrap').offset().top) - parseInt($(b).parents('.question-wrap').offset().top)
                    });
                    console.log($(erroreArrayElemnts[0]));
                    $('.question-list').scrollTo($(erroreArrayElemnts[0]).parents('.question-wrap'), 1000); //custom animation speed 
                }
            });
        });
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
        function validatePhone(txtPhone) {
            var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
            if (filter.test(txtPhone)) {
                return true;
            }
            else {
                return false;
            }
        }
        //only number for phone
        $('.phone-input').inputFilter(function(value) {
            return /^-?\+?\d*$/.test(value) && (value === "" || value);
        });

        //crutch for 17 survey
        let surveyId = $('input[name=survey_id]').val();
        if(surveyId == '17'){
            let questions = $('.pool-wrap').find('.question-wrap');
            let branchQuestion = $(questions[3]);
            branchQuestion.next().fadeOut(0);
            branchQuestion.next().next().fadeOut(0);
            branchQuestion.find('input').change(function(e){
                if($(this).is(":checked")){
                    if($(this).val() < 3) {
                        branchQuestion.next().fadeOut(0);
                        branchQuestion.next().next().fadeIn(300);                        
                    } else {
                        branchQuestion.next().fadeIn(300);
                        branchQuestion.next().next().fadeOut(0);
                    }
                }
            });
        }
    });
});
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()