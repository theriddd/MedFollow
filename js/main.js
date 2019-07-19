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
            "right":"-320px"
        }, "slow");
        $('.transparency-layer').fadeOut('fast');
    });

    $('.notifications-container').click(function(){
        $('.notifications-detail').fadeToggle();
    });

    $('.notifications-container').on('.delete-icon .material-icons', 'click', function(){
        console.log('delete notification');
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
});