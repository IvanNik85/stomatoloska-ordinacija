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
            $('ul li:last-child').hide().html(`<li><a href="##">Ivan</a></li>`);
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

    class Patient {
        constructor(ime, prezime, email, telefon, brojKartona) {
            this.ime = ime;
            this.prezime = prezime;
            this.email = email;
            this.telefon = telefon;
            this.brojKartona = brojKartona;
        }
    }
    class PatientData extends Patient {
        constructor(ime, prezime, email, telefon, brojKartona, usluga, stomatolog, password) {
            super(ime, prezime, email, telefon, brojKartona);
            this.usluga = usluga;
            this.stomatolog = stomatolog;
            this.pass = password;
            // this.datum = datum;
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
    let usluga = ['Pregled', 'Plombiranje', 'Vađenje', 'Protetika'];
    let stomatolog = ['Dr Milan Stankovic', 'Dr Marijana Cvetkovic', 'Dr Ana Rebic'];

    function randNumber(nm) {
        return Math.floor(Math.random() * 9990000);
    }
    function generate(value) {
        return value[Math.floor(Math.random() * value.length)];
    }

    // Dodati datum kao objekt ili niz    
    function generatePatients() {  
        patient.ime = generate(ime);
        patient.prezime = generate(prezime);
        patient.email = `${patient.ime}.${patient.prezime}@${generate(email)}.com`; 
        patient.pass = `${patient.ime}${(randNumber()%1000)}`
        patient.usluga = generate(usluga);
        patient.stomatolog = generate(stomatolog);        
        let phone = `${generate(mreza)}/${randNumber()}`;
        let newPatient = new PatientData(patient.ime, patient.prezime, patient.email, phone, randNumber(), patient.usluga, patient.stomatolog, patient.pass);
        for(let j in allPatients) {
            if(patient.ime === allPatients[j].ime && patient.prezime === allPatients[j].prezime) {
                allPatients.splice(j, 1);
            } 
        }   
        allPatients.push(newPatient);        
    }    

    while(allPatients.length < 100) {
        generatePatients();
        }

    // console.log(allPatients);
    if (!localStorage.getItem('listaPacijenata')) {
        let myJSON = JSON.stringify(allPatients);
        localStorage.setItem('listaPacijenata', myJSON);
    }

    $('.finish').click(function () {
        let inputName = $('#ime1').val();
        let inputSurname = $('#prezime1').val();
        let inputEmail = $('#email1').val();
        let phone = $('#phone').val();
        let insertSlash = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
        let inputPhone = insertSlash(phone, '/', 3);
        let pregled = $('#pregled').val();
        let stomat = $('#stomat').val();
        let password = $('#pass').val();
        // let newStr = inputPhone.split(''); 
        // newStr.splice(3,0, '/');
        // newStr = newStr.join('');

        if (localStorage.getItem('listaPacijenata')) {
            allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
            allPatients.push(new PatientData(inputName, inputSurname, inputEmail, inputPhone, randNumber(), pregled, stomat, password));
            localStorage.setItem('listaPacijenata', JSON.stringify(allPatients));
            $("input, select").val('');
            console.log(allPatients);
        }
    });

    let showTable = document.querySelector('.table');
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.setAttribute('id', 'patientsTable');

    function createTable(val) {
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
        createTable(allPatients);
    });

    let filter = [];
    let values = [];  
    let search = ['#imePac', '#prezimePac', '#email', '#telefon', '#karton', '#usluga', '#stomatolog'];
    let searchValues = ['ime', 'prezime', 'email', 'telefon', 'brojKartona', 'usluga', 'stomatolog'];

    $('#filter').click(function () {        
        remPrevTable();
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i = 0; i < 8; i++) {
            values.push($(search[i]).val());
        }
        for (let i in allPatients) {           
            for (let j in values) {
                for (let k in searchValues) {
                    if (values[j] == allPatients[i][searchValues[k]] && j == k) {
                        filter.push(allPatients[i]);
                    }
                }
            }            
        }                
        console.log(filter)

        filter.length ? createTable(filter): $('.table h4').show();        

        filter = [];
        values = [];
    });
       //date min today
       var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth() + 1; //January is 0!
       var yyyy = today.getFullYear();

       dd < 10 && (dd = '0' + dd);         
       mm < 10 && (mm = '0' + mm); 

       today = yyyy + '-' + mm + '-' + dd;
       $("#date").attr("min", today);

});
