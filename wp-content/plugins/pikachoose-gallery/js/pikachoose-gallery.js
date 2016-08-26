jQuery(document).ready(function() {
    jQuery('.pikachoose-gallery').each(function() {
        var carousel = jQuery(this).data('carousel');

	        jQuery(this).PikaChoose({autoPlay:false, carousel: carousel, speed: 10, transition:[1], animationSpeed:0 });
    });
})