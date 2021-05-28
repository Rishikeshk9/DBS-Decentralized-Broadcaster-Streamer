$(document).ready(function(e) { 
    $('#demo').slick({
        slidesToShow: 9,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 3000, 
        lazyLoad: 'ondemand',
        arrows: false,
        dots: false,
               
            responsive: [{
                breakpoint: 1920,
                settings: {
                    slidesToShow: 8
                }
            },{
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6
                }
            },{
                breakpoint: 1152,
                settings: {
                    slidesToShow: 5
                }
            },{
            breakpoint: 992,
            settings: {
                slidesToShow: 4
            }
        },{
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 240,
            settings: {
                slidesToShow: 2
            }
        },]
    });
    
    console.log("completely loaded"); 
});

