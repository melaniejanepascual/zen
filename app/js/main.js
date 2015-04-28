jQuery(document).ready(function($){

    // try to set ZenBar width onLoad if it is present
    var zenbar = $('.zen_zenbar-fill');
    zenbar.addClass('width-' + zenbar.attr('data-width'));

}(jQuery));
