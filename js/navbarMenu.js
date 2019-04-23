export function navMeni(c, d) {

    $(document).ready(function () {
        let dot = c;
        var links = [] 
        let niz = ['Home', 'Info', 'Galerija', 'Zakazivanje', 'Kontakt', 'Login'];
        $('body').prepend(`<nav><a href="${c}./index.html#home"class="logo"><img src="${c}./images/logo.jpg" alt="logo"></a>
                           <a href="##"><i class="fa fa-bars"></a><ul></ul></nav>`);
        for (let i = 0; i < 5; i++) {
            let link = `${c}./index.html#${niz[i].toLowerCase()}`
            $('nav ul').append(`<li><a href="${link}">${niz[i]}</a></li>`);             
            links.push(`${link}`); 
        }  
        $('nav ul').append(`<li><a href=".${d}/loginAdmin.html" id="adm">Admin</a></li>`);     
        $('nav ul').append(`<li><a href=".${d}/loginUser.html" id="log">Login</a></li>`);                        
        
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
        });        
    });
}