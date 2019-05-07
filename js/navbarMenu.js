export function navMeni(c, d) {

    $(document).ready(function () {
        let dot = c;
        var links = [] 
        let niz = ['Pocetna', 'Informacije', 'Galerija', 'Zakazivanje', 'Kontakt', 'Login'];
        $('body').prepend(`<nav><a href="${c}./index.html#pocetna"class="logo"><img src="${c}./images/logo1.png" alt="logo"></a>
                           <a href="##"><i class="fa fa-bars"></a><ul></ul></nav>`);
        for (let i = 0; i < 6; i++) {
            let link = `${c}./index.html#${niz[i].toLowerCase()}`
            $('nav ul').append(`<li><a href="${link}">${niz[i]}</li>`);             
            links.push(`${link}`); 
            if(i == 5)  {                
                $('nav ul li:last-child').addClass('dropdown').html(`<span>Login</span><i class="fas fa-angle-down"></a>`);
            } 
        }  
        $('nav ul li:last-child').append(`<div class="dropCont"><li><a href=".${d}/loginAdmin.html" id="adm">Admin</a></li>
                                          <li><a href=".${d}/loginUser.html" id="log">User</a></li>
                                          <li><a href="##" id="logout">Logout</a></li></div>`);  
        $('#logout').hide();                                         
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
        
        (location.reload) && $('nav').addClass('navActive');  
    });
}