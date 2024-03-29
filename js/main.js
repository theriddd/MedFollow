/**
 * nextThrough
 * jQuery plugin to find the next element that matches a selector,
 * whatever the DOM structure.
 *
 * @param   {string}    selector    A jQuery/CSS selector to find from a given jQuery object
 * @return  {object}                The new element found
 */
( function ( $ ) {
    'use strict';
    $.fn.nextThrough = function( selector ) {
        // Our reference will be the last element of the current set
        var $reference = $( this ).last(),
            // Add the reference element to the set the elements that match the selector
            $set = $( selector ).add( $reference ),
            // Find the reference position to the set
            $pos = $set.index( $reference );

        // Return an empty set if it is the last one
        if ( $set.length === $pos ) {
            return $();
        }

        // Return the next element to our reference
        return $set.eq( $pos + 1 );
    };
} ( jQuery ) );

$(document).ready(function(){
    function iformat(icon) {
        var originalOption = icon.element;
        // return $('<span><i class="material-icons">' + $(originalOption).data('icon') + '</i> ' + icon.text + '</span>');
        if($(originalOption).data('icon') !== '')
        {
            return $('<span><img src="./img/icons/' + $(originalOption).data('icon') + '">' + icon.text + '</span>');
        }
        else
        {
            return $('<span>' + icon.text + '</span>');
        }
    }

    function capsuleTemplate(arrHours, containerClass){
        console.log(arrHours.length);
        var insertHtml = "", i;
        for (i = 0; i < arrHours.length; i++)
        {
            console.log('vu');
            insertHtml += '<div class="hourSelectedFrequency">\n' +
                '       <div class="leftBorder"></div>\n' +
                '       <div class="content"><input type="text" value="' + arrHours[i] + '" class="datepicker"></div>\n' +
                '       <div class="rigthBorder"></div>\n' +
                '   </div>';
        }
        console.log(insertHtml);
        $('.' + containerClass).empty();
        $('.' + containerClass).append(insertHtml);

        /*$('.datepicker').datepicker({
            format: "dd/mm/yyyy",
            language: "es"
        });*/
    }

    $('select').select2({
        width: "100%",
        templateSelection: iformat,
        templateResult: iformat,
        allowHtml: true
    });

    $('.loader').fadeOut(500, function(){
        $(this).remove();
        $('.content-loaded').removeClass('d-none');
    });

    $('.owl-treatments').owlCarousel({
        loop:true,
        autoplay: false,
        margin:10,
        items: 1,
        nav: true,
        navText: ["<div class='prev'></div>", "<div class='next'></div>"]
    });

    var file = window.location.pathname;
    if(file.indexOf("register"))
    {
        $('#formRegister').find('.select2-container--default').css({
            'position': 'relative',
            'flex': '1 1 auto',
            'width': '1%',
            'padding-top': '5px'
        });
    }

    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        language: "es"
    });

    // $('.open-modal').click(function(){
    //     var t = $(this).data('title-modal'),
    //         c = $(this).data('content-modal'),
    //         t = $(this).data('target'),
    //         $modal = $('.modal');
    //
    //     $modal.find('.title').text(t);
    //     $modal.find('.text').text(c);
    // });

    $('.menu-button').click(function(){
        $(".side-menu").animate({
            "right":"0"
        }, "slow");
        $('.transparency-layer').fadeIn('fast');
    });

    $('.float-main-button').click(function(){
        $('.quick-actions').fadeToggle();
    });

    $('.side-menu .header > .close').click(function(){
        $(".side-menu").animate({
            "right":"-360px"
        }, "slow");
        $('.transparency-layer').fadeOut('fast');
    });

    $('.notifications-container').click(function(){
        $('.notifications-detail').fadeToggle();
    });

    $('.notifications-container').on('.delete-icon .material-icons', 'click', function(){
        console.log('delete notification');
    });

    $('.admin-content').click(function(){
        if($('.notifications-detail').css('display') === 'block')
            $('.notifications-detail').fadeToggle();
    });

    $('#check-data-doctor').click(function(){
        if($('#check-data-doctor').is(':checked'))
        {
            $('#selectDoctor').next('.select2-container--default').css('display', 'none');
            $('#selectDoctor_label').css('display', 'none');
        }
        else
        {
            $('#selectDoctor').next('.select2-container--default').css('display', 'block');
            $('#selectDoctor_label').css('display', 'block');
        }
    });

    $('#check-no-finish-date').click(function(){
        if($('#check-no-finish-date').is(':checked'))
        {
            $('#endDate').css('display', 'none');
            $('#endDate_label').text('Sin fecha de término');
        }
        else
        {
            $('#endDate').css('display', 'block');
            $('#endDate_label').text('Cuando terminas?');
        }
    });

    $('#selectFrequency').change(function(){
        if($('#selectFrequency').val() === 'custom')
        {
            $('#selectFrequency').next('.select2-container--default').css('display', 'none');
            $('#endFrequency').css('display', 'block');
        }
    });

    $('#selectFrequencyDay').change(function(){
        var arrHours;
        if($(this).val() === "Opcion1")
        {
            arrHours = ["08:00hr", "20:00hr"];
        }
        if($(this).val() === "Opcion2")
        {
            arrHours = ["08:00hr", "16:00hr", "00:00hr"];
        }
        if($(this).val() === "Opcion3")
        {
            arrHours = ["06:00hr", "12:00hr", "18:00hr", "00:00hr"];
        }

        capsuleTemplate(arrHours, "capsulesHours");
    });

    $('button.button-next').click(function(){
        var t = $(this).data('target');
        $('form').attr('action', t);
        $('form').attr('method', 'post');
        $('form').submit();
    });

    $('button.button-create').click(function(e){
        e.preventDefault();
        $('.modal').modal();
    });

    $('.button-send-invitation').click(function(e){
        e.preventDefault();
        $('.modal').modal();
    });

    var extended = false, heightStandard = 0;
    $('.extend').click(function(){
        var height = $(this).nextThrough( '.treatments' ).height(),
            $objectContainer = $(this).closest('.option'),
            heightMainContainer = $objectContainer.css('height');

        heightMainContainer = heightMainContainer.replace("px", "");
        console.log(heightMainContainer);
        heightStandard = (heightStandard === 0)?parseInt(heightMainContainer):heightStandard;
        if(extended === false){
            $objectContainer.animate({
                "height":(height + parseInt(heightMainContainer) + 40) + "px"
            }, "slow");
            extended = true;
        }
        else{
            $objectContainer.animate({
                "height":(heightStandard) + "px"
            }, "slow");
            extended = false;
        }
    });

    $('.container-hours').find(function(){

    });

    //validations
    var isError = false;
    var emptyErrors = function(){
        $('input').removeClass('error');
        $('span.select2-selection__rendered').removeClass('error');
        $(".link-terms").removeClass('error')
    } || {};
    $('#formRegister').submit(function(e){
        e.preventDefault();
        var $modalError = $('#modal-error');
        emptyErrors();
        $('.noEmpty').each(function(){
            if($(this).val() === "")
            {
                isError = true;
                $(this).addClass('error');
            }
        });
        $('select').each(function(){
            if($('select').val() === "")
            {
                isError = true;
                $('span.select2-selection__rendered').addClass('error');
            }
        });

        if($('#password').val() !== $('#repeatPassword').val())
        {
            isError = true;
            $('#password').addClass('error');
            $('#repeatPassword').addClass('error');
            $modalError.find('.title').text('Error');
            $modalError.find('.text').text('Las contraseñas no coinciden.');
        }

        if(!$("#gridCheck").is(':checked'))
        {
            isError = true;
            $(".link-terms").addClass('error')
        }

        if(isError === true)
        {
            $('#modal-error').modal();
            return false;
        }
        else
        {
            $('#formRegister').submit();
        }
    });
});