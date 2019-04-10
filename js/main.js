import { navMeni } from './navbarMenu.js'

if(window.location.href.indexOf('/login/')!= -1) {    
    navMeni('.', '');    
} else {
    navMeni('', '/login');  
}

$(document).ready(function () {  
    let admName = 'ivan';
    let admPass = 'nik';
    let user = [];
    let adm = 0;
    let parms = [admName, admPass, '#imeAdm', '#passAdm'];
    //napomena - prilikom unosa imena korisnika koristiti toLowerCase
   
    $('#submitAdmin').click(function () {
        $('#imeAdm').val() == admName && $('#passAdm').val() == admPass ?
        potvrda(...parms):
        nijePotvrda(...parms);
    })

    $('#imeAdm, #passAdm').keypress(enter);
    // $(window).keypress(enter);

    function enter(event) {
        if (event.which == 13) {
            potvrda(...parms) || 
            nijePotvrda(...parms);
            // event.preventDefault();
        }
    }    
    function potvrda(a, b, c, d) { 
        if ($(c).val() == a && $(d).val() == b) {
            // $('ul li:last-child').hide().html(`<li><a href="##">Ivan</a></li>`);
            $('.toggle').hide();
            $('.content').show();
        } 
    }
    function nijePotvrda(a, b, c, d) {
        if ($(c).val() != a || $(d).val() != b) {
            $(c).attr('placeholder', 'Molimo unesite ime');
            $(d).attr('placeholder', 'Molimo unesite password');
            setTimeout(function () {
                alert(`Neispravno ime ili password. Pokušajte ponovo!`)
            }, 20);
            setTimeout(function () {
                $('#imeAdm, #passAdm').removeAttr('placeholder');
                $('#ime, #pass').removeAttr('placeholder');
            }, 1500)
        }
    }
  
    $('#submit').click(function () {      
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i in allPatients) {
            let ime = allPatients[i].ime;
            let password = allPatients[i].pass;
            var parUser = [ime, password, '#ime', '#pass']
            if (ime == $('#ime').val() && password == $('#pass').val()) {
                user.push(allPatients[i]);
                potvrda(...parUser);
                break;
            }     
        }
         nijePotvrda(...parUser);  
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
        constructor(ime, prezime, email, telefon, brojKartona, usluga, stomatolog, date, password) {
            super(ime, prezime, email, telefon, brojKartona);
            this.usluga = usluga;
            this.stomatolog = stomatolog;
            this.date = date
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

    function randNumber() {
        return Math.floor(Math.random() * 9990000);
    }
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        // if(randDate.getDay()!=0 &&randDate.getDay()!=6) {           
        // } 
    }
    function generate(value) {
        return value[Math.floor(Math.random() * value.length)];
    }

    // Dodati datum kao objekt ili niz    
    function generatePatients() {
        patient.ime = generate(ime);
        patient.prezime = generate(prezime);
        patient.email = `${patient.ime}.${patient.prezime}@${generate(email)}.com`;
        patient.usluga = generate(usluga);
        patient.stomatolog = generate(stomatolog);
        patient.date = randomDate(new Date('2016-05-01'), new Date()).toDateString();          
        patient.pass = `${patient.ime}${(randNumber() % 1000)}`
        let phone = `${generate(mreza)}/${randNumber()}`;
        let newPatient = new PatientData(patient.ime, patient.prezime, patient.email, phone, randNumber(),
                                         patient.usluga, patient.stomatolog, patient.date, patient.pass);
        for (let j in allPatients) {
            if (patient.ime === allPatients[j].ime && patient.prezime === allPatients[j].prezime) {
                allPatients.splice(j, 1);
            }
        }
        allPatients.push(newPatient);
    }

    while (allPatients.length < 100) {
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
        // let date = $('#date').val();
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
    table.setAttribute('class', 'patientsTable');

    function createTable(val) {
        showTable.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        let tr1 = document.createElement('tr');
        thead.appendChild(tr1);
        for (let i = 0; i < val.length; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for (let j = 0; j < Object.keys(val[0]).length - 1; j++) {
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
        $('.patientsTable tbody tr').click(function(){ 
            remPrevTable();
            user.push(val[this.firstChild.innerHTML-1]); 
            userData(user[0]);
            user = [];
        }); 
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

        filter.length ? createTable(filter) : $('.table h4').show();

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

    // let dateKAl = document.getElementById('date');
    // $('.prev').click(function () {
    //     console.log(dateKAl.value)
    // })

    let userContent = document.querySelector('.table, .userContent'); //.table
    function userData(val) { 
        userContent.appendChild(table);
        // table.setAttribute('id', 'userTable');
        table.appendChild(tbody);
        for(let i=0; i<Object.keys(val).length - 1; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for(let j=0; j<2;j++) {
                if(j==0) {                   
                    let th = document.createElement('th');
                    th.innerHTML = Object.keys(val)[i];
                    tr.appendChild(th);
                } else {
                    let td = document.createElement('td');
                    td.innerHTML = Object.values(val)[i];
                    tr.appendChild(td);
                }
            }
        }
    }
    $('#userInfo').click(function(){
        userData(user[0]);
        user = [];
    });

    // let patTable = document.getElementById('patientsTable');
    // patTable.addEventListener('click',function(){
    //     console.log(`nesto`);
    // });
});
