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
    function potvrda(e) {
        let $logName = $('#ime').val().toLowerCase();
        let $logPass = $('#pass').val().toLowerCase();
        if ($logName == imeAdmin && $logPass == passAdmin) {
            console.log('Uspeh')
            $('ul li:last-child').hide().html(`<li><a href="##">Ivan</a></li>`).css({ color: 'red' });
            $('.toggle').hide();
            $('.adminContent').show();
            $('.welcome').append(`<h1>Dobrodosli na Admin stranu</h1>`)
        } else if (!$logName || !$logPass) {
            $('#ime').attr('placeholder','Molimo unesite ime');
            $('#pass').attr('placeholder','Molimo unesite password');
            setTimeout(function () {
                $('#ime').removeAttr('placeholder');
                $('#pass').removeAttr('placeholder');
            }, 2000)
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
    // var set = new Set(allPatients); //   {1,2,3}
    // var arr = Array.from(set);//  [1,2,3]        
    generatePatients(100);
    if (!localStorage.getItem('listaPacijenata')) {
        let myJSON = JSON.stringify(allPatients);
        localStorage.setItem('listaPacijenata', myJSON);
    }

    $('.finish').click(function () {
        let inputName = $('#ime1').val();
        let inputSurname = $('#prezime1').val();
        let inputEmail = $('#email').val();
        let phone = $('#phone').val();
        let insertSlash = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
        let inputPhone = insertSlash(phone, '/', 3)
        // let newStr = inputPhone.split(''); 
        // newStr.splice(3,0, '/');
        // newStr = newStr.join('');

        if (localStorage.getItem('listaPacijenata')) {
            allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
            allPatients.push(new Pacijent(inputName, inputSurname, inputEmail, inputPhone, randNumber()));
            localStorage.setItem('listaPacijenata', JSON.stringify(allPatients));
            console.log(allPatients);
        }
    });

    let showTable = document.querySelector('.table');
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.setAttribute('id', 'patientsTable');

    function izvucena(val) {
        showTable.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        let tr1 = document.createElement('tr');
        thead.appendChild(tr1);
        for (let i = 0; i < val.length; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for (let j = 0; j < Object.keys(val[0]).length; j++) {
                if (i == 0 && j == 0) {
                    let num = document.createElement('th');
                    num.innerHTML = 'Br.';
                    tr1.appendChild(num);
                }
                if (i == 0) {
                    let th = document.createElement('th');
                    th.innerHTML = Object.keys(val[0])[j];
                    tr1.appendChild(th);
                }
                if (j == 0) {
                    let num = document.createElement('td');
                    num.innerHTML = i + 1;
                    tr.appendChild(num);
                }
                let td = document.createElement('td');
                td.innerHTML = Object.values(val[i])[j];
                tr.appendChild(td);
            }
        }
    }
    function remPrevTable() {
        $('thead').empty();
        $('tbody').empty();
        $('.table h4').hide();
    }

    $('#allPatients').click(function () {
        remPrevTable();
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        izvucena(allPatients);
    });

    let filter = [];
    let values = [];   //uporediti vrednosti unosa sa allPatients.ime npr.
    let search = ['#imePac', '#prezimePac', '#karton', '#telEmail', '#usluga', '#stomatolog',];
    let searchValues = ['ime', 'prezime', 'email', 'telefon', 'brojKartona'];


    $('#filter').click(function () {
        remPrevTable();
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i = 0; i < 6; i++) {
            values.push($(search[i]).val());
        }
        for (let i in allPatients) {
            for (let j of values) {
                for (let k of searchValues) {
                    if (j == allPatients[i][k]) {
                        filter.push(allPatients[i]);
                    }
                }
            }
        }
        console.log(filter)

        filter.length ? izvucena(filter): $('.table h4').show();        

        filter = [];
        values = [];
    });

});
