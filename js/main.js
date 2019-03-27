import {navMeni} from './navbarMenu.js'

$(document).ready(function () {
    $('body').prepend(navMeni);  
    let imeLogin = 'marija';
    let prezimeLogin = 'markovic';
    //napomena - prilikom unosa imena korisnika koristiti toLowerCase

    $('#submit').click(function (event ) {
        // let $vrednost = $('#ime').val().toLowerCase();
        // let $vrednost1 = $('#prezime').val().toLowerCase();
        console.log($('#ime').val())
        potvrda();
        event.preventDefault();
    })
    $('#ime').keypress(enter);
    $('#prezime').keypress(enter);    

    function enter(event) {
        if (event.which == 13) {
            potvrda();
            event.preventDefault();
        }
    }
    function potvrda() {        
        if ($('#ime').val().toLowerCase() == imeLogin && $('#prezime').val().toLowerCase() == prezimeLogin) {
            console.log('Uspeh')
            $('ul li:last-child').text('Marija').css({color: 'yellow',padding: '8px'})
        } else {
            console.log('Nece');
        }
    }
    $("a.nav-link").click(function(){
        console.log('nesto')        
        $('.navbar-nav').find(".active").removeClass("active");
        $(this).parent().addClass("active");
        //event.preventDefault();
    });
    $('#scrollTop').click(topFunction);
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 1850) {
            $('#scrollTop').css('display','block');
        } else {
            $('#scrollTop').css('display','none');
        }
      }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    //   $("a.nav-link").click(function(){
    //   if($(this).attr('a[href^="./login"]')) {
    //       console.log('true')
    //    $('a[href^=/login"]') = $('a[href^=/login"]')
    //   }
    // });
});

