import { navMeni } from './navbarMenu.js'
navMeni();

$(document).ready(function () {
    let imeAdmin = 'ivan';
    let passAdmin = 'nik';
    //napomena - prilikom unosa imena korisnika koristiti toLowerCase

    $('#submitAdmin').click(function (event) {
        console.log($('#ime').val())
        potvrda();
        event.preventDefault();
    })
    $('#ime').keypress(enter);
    $('#prezime').keypress(enter);

    function enter(event) {
        if (event.which == 13) {           
            potvrda();
            // event.preventDefault();
        }
    }
    function potvrda() {
        let $logName = $('#ime').val().toLowerCase();
        let $logPass = $('#pass').val().toLowerCase();
        if ($logName == imeAdmin && $logPass == passAdmin) {
            console.log('Uspeh')
            $('ul li:last-child').hide().html(`<li><a href="##">Ivan</a></li>`).css({ color: 'red' });
            $('.toggle').hide();
            $('.adminContent').show();
            $('.welcome').append(`<h1>Dobrodosao ${$logName}e<br/>Uspesno ste se Ulogovali</h1>`)
        } else if($logName == ' '){
            $('#ime1').attr('placeholder','molimo unesite ime');
            setTimeout(function() {
                $('#ime1').removeAttr('placeholder')
            }, 1500)           
        }        
    }

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

    function randNumber() {
        return Math.floor(Math.random() * 9000000);
    }
    function generate(value) {
        return value[Math.floor(Math.random() * value.length)];
    }

    // Dodati datum kao objekt ili niz    
    function generatePatients(num) {
        for (let i = 0; i < num; i++) {            
            let phone = `${generate(mreza)}/${randNumber()}`;
            patient.ime = generate(ime);
            patient.prezime = generate(prezime);
            patient.email = `${patient.ime}.${patient.prezime}@${generate(email)}.com`;
            allPatients.push(new Pacijent(patient.ime, patient.prezime, patient.email, phone, randNumber()));
        }
    }
    generatePatients(100);    
    if (!localStorage.getItem('listaPacijenata')) {
        let myJSON = JSON.stringify(allPatients);
        localStorage.setItem('listaPacijenata', myJSON);
    }   

    $('.finish').click(function() {
        let inputName = $('#ime1').val();
        let inputSurname = $('#prezime1').val();
        let inputEmail = $('#email').val();
        let inputPhone = $('#phone').val();
        
        if(localStorage.getItem('listaPacijenata')) {
            allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
            allPatients.push(new Pacijent(inputName, inputSurname, inputEmail, inputPhone, randNumber())); 
            localStorage.setItem('listaPacijenata', JSON.stringify(allPatients));
            console.log(allPatients);  
        }        
    });  
    
    $('#allPatients').click(function(){        
        let showTable = document.querySelector('.table');
        let table = document.createElement('table');
        table.setAttribute('id', 'patientsTable') 
        showTable.appendChild(table);            
        for(let i=0; i<allPatients.length; i++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);             
            for(let j=0;j<Object.keys(allPatients[0]).length;j++) {
                if(i==0) {
                let th = document.createElement('th');
                th.innerHTML = Object.keys(allPatients[0])[j];
                tr.appendChild(th);
                continue;
            }
                let td = document.createElement('td');
                td.innerHTML = Object.values(allPatients[i])[j];
                tr.appendChild(td);
            }
        }     
    });
    
    let filter = [];    
    $('#filter').click(function(){ 
        let imeFilter = $('#imePac').val(); 
            for(let i = 0; i< allPatients.length; i++) {
            if(imeFilter == allPatients[i].ime) {
                console.log(allPatients[i])
            }
        }
    });
    
});
