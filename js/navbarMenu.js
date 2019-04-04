export function navMeni() {

    $(document).ready(function () {
        var links = [] 
        let niz = ['Home', 'Info', 'Galerija', 'Zakazivanje', 'Kontakt', 'Login'];
        $('body').prepend(`<nav><a href="#home"class="logo"><img src="./images/logo.jpg"></a><a href="##"><i class="fa fa-bars"></a><ul></ul></nav>`);
        for (let i = 0; i < 5; i++) {
            let link = `./index.html#${niz[i].toLowerCase()}`
            $('ul').append(`<li><a href="${link}">${niz[i]}</a></li>`);             
            links.push(`${link}`); 
        }  
        $('ul').append(`<li><a href="./login/loginAdmin.html" id="adm">Admin</a></li>`);     
        $('ul').append(`<li><a href="./login/loginUser.html" id="log">Login</a></li>`);  
                      
            // $('#adm, #log').mouseleave(function(){
            //     let a = $(this).attr('href');               
            //     let all = document.querySelectorAll('li a');
            //     if(location.pathname == a.slice(1)) {
            //         console.log('true')
            //     for (let i in links) {
            //         all[i].setAttribute('href', '.' + links[i]); 
            //     }  
            // }
            // })          

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