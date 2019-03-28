import {navMeni} from './navbarMenu.js'
navMeni();

$(document).ready(function () {   
    let imeLogin = 'marija';
    let prezimeLogin = 'markovic';
    //napomena - prilikom unosa imena korisnika koristiti toLowerCase

    $('#submit').click(function (event ) {        
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
        let $logName = $('#ime').val().toLowerCase();   
         let $logSurname = $('#prezime').val().toLowerCase();  
        if ($logName == imeLogin && $logSurname == prezimeLogin) {
            console.log('Uspeh')
            $('ul li:last-child').text('Marija').css({color: 'yellow',padding: '8px'})
            $('form').css('display','none');
            $('body').append(`<h1>Dobrodosla ${$logName}<br/>Uspesno ste se Ulogovali</h1>`)
         } //else if($logName = ' '){
        //     $('#ime').attr('placeholder','molimo unesite ime');
        //     setTimeout(function() {
        //         $('#ime').removeAttr('placeholder')
        //     }, 1500)           
        // }        
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
});

