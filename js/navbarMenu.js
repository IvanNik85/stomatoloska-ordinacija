export function navMeni() {

    $(document).ready(function () {

        let niz = ['Home', 'Info', 'Galerija', 'Zakazivanje', 'Kontakt', 'Login'];
        $('body').prepend(`<nav><a href="#home"class="logo"><img src="./images/logo.jpg"></a><a href="##"><i class="fa fa-bars"></a><ul></ul></nav>`);
        for (let i = 0; i < 5; i++) {
            $('ul').append(`<li><a href="#${niz[i].toLowerCase()}">${niz[i]}</a></li>`);           
        }        
        $('ul:last-child').append(`<li><a href="./login/loginUser.html">Login</a></li>`);

        let rotate = 'fa-times rotate';
        $('.fa-bars').click(function () {
            $('nav ul li').toggle("slide", { direction: "left" }, 500);
            $(this).toggleClass(rotate);
        });
                
        $(window).resize(() => {            
            $(this).width() < 992 && $('nav ul li').hide();
            $('i').removeClass(rotate);
        });
        $(window).scroll(() => {
            $(this).scrollTop() > 20 ? $('nav').addClass('navActive'): $('nav').removeClass('navActive'); 
        })
    })
}