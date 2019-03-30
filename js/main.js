import { navMeni } from './navbarMenu.js'
navMeni();

$(document).ready(function () {
    let imeLogin = 'marija';
    let passLogin = 'matic';
    //napomena - prilikom unosa imena korisnika koristiti toLowerCase

    $('#submit').click(function (event) {
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
        let $logPass = $('#pass').val().toLowerCase();
        if ($logName == imeLogin && $logPass == passLogin) {
            console.log('Uspeh')
            $('ul li:last-child').text('Marija').css({ color: 'red' })
            $('form').css('display', 'none');
            $('body').append(`<h1>Dobrodosla ${$logName}<br/>Uspesno ste se Ulogovali</h1>`)
        } //else if($logName = ' '){
        //     $('#ime').attr('placeholder','molimo unesite ime');
        //     setTimeout(function() {
        //         $('#ime').removeAttr('placeholder')
        //     }, 1500)           
        // }        
    }

    $("a.nav-link").click(function () {
        console.log('nesto')
        $('.navbar-nav').find(".active").removeClass("active");
        $(this).parent().addClass("active");
        //event.preventDefault();
    });
    $('#scrollTop').click(topFunction);
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 1850) {
            // $(window).scrollTop()
            $('#scrollTop').css('display', 'block');
        } else {
            $('#scrollTop').css('display', 'none');
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});

class Pacijent {
    constructor(ime, prezime, email, telefon, brojKartona) {
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.telefon = telefon;
        this.brojKartona = brojKartona;
    }
}
let allPatients = [];
let patient = {};
let ime = ['Marko', 'Milos', 'Nenad', 'Zoran', 'Stefan', 'Milan', 'Aleksa',
    'Marija', 'Milica', 'Anica', 'Bojana', 'Jelena', 'Sanja', 'Natasa',
    'Gordana', 'Milan', 'Lazar', 'Miljko', 'Svetlana', 'Kristina'];
let prezime = ['Jovanovic', 'Aleksic', 'Boskovic', 'Miletic', 'Paunovic', 'Krstic', 'Vasic',
    'Matic', 'Pavic', 'Ognjenovic', 'Milosevic', 'Popovic', 'Petrovic', 'Jevremovic',
    'Velickovic', 'Sretenovic', 'Smiljanic', 'Milivojevic', 'Urosevic', 'Stankovic'];
let email = ['gmail', 'yahoo', 'outlook'];
let mreza = ['061', '062', '063', '064', '065'];

function generate(value) {
    return value[Math.floor(Math.random() * value.length)];
}
// function genTel() {
//     return `${generate(telefon)}/${number}`
// }
function generatePatients(num) { 
    for(let i=0;i<num;i++) {
        let number = Math.floor(Math.random() * 9000000);
        let tel = `${generate(mreza)}/${number}`;
        patient.ime = generate(ime);
        patient.prezime = generate(prezime);
        patient.email = `${patient.ime}.${patient.prezime}@${generate(email)}.com`;
        allPatients.push(new Pacijent(patient.ime, patient.prezime, patient.email, tel, number));
    }
}
generatePatients(100);
if(!localStorage.getItem('listaPacijenata')) {
    let myJSON = JSON.stringify(allPatients);
    localStorage.setItem('listaPacijenata', myJSON);
}
// let name = JSON.stringify(localStorage.getItem('listaPacijenata'));


console.log(allPatients)
