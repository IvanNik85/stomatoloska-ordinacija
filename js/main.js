import { navMeni} from './navbarMenu.js'
import { gallery} from './gallery.js'

if(window.location.href.indexOf('/login/')!= -1) {    
    navMeni('.', '');    
} else {
    navMeni('', '/login');  
}
if(window.location.href.indexOf('/login/')== -1) {
    gallery();
}

$(document).ready(function () { 
    let admName = 'ivan';
    let admPass = 'nik';
    let user = [];
    let loggedUser = [];
    let startTime = 10;
    let randTime = [];
    let minutes;
    let $dateVal = new Date().toDateString(); 
    setTime(time);
    let parms = [admName, admPass, '#imeAdm', '#passAdm'];
    //napomena - prilikom unosa imena korisnika koristiti toLowerCase
   
    $('#submitAdmin').click(function () {
        $('#imeAdm').val() == admName && $('#passAdm').val() == admPass ?
        potvrda(...parms):
        nijePotvrda(...parms);
    });

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
            $('.box label').hide();
            setTimeout(function () {
                alert(`Neispravno ime ili password. Pokušajte ponovo!`)
            }, 20);
            setTimeout(function () {
                $('#imeAdm, #passAdm').removeAttr('placeholder');
                $('#ime, #pass').removeAttr('placeholder');
                $('.box label').show();
            }, 1500)
        }
    }
  
    $('#submit').click(function () {      
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i in allPatients) {
            let username = allPatients[i].username;
            let password = allPatients[i].pass;
            var parUser = [username, password, '#ime', '#pass']
            if (username == $('#ime').val() && password == $('#pass').val()) {
                user.push(allPatients[i]);
                loggedUser.push(allPatients[i]);
                localStorage.setItem('loggedUser',JSON.stringify(loggedUser));
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
            $('#scrollTop').slideDown(400);           
        } else {
            $('#scrollTop').slideUp(400);
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
        constructor(ime, prezime, email, telefon, brojKartona, usluga, stomatolog, date, username, password) {
            super(ime, prezime, email, telefon, brojKartona);
            this.usluga = usluga;
            this.stomatolog = stomatolog;
            this.date = date;
            this.username = username;
            this.pass = password;
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
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        if(new Date(date).getDay()!=0 && new Date(date).getDay()!=6) {
        return date;
        } 
    }
    function generate(value) {
        return value[Math.floor(Math.random() * value.length)];
    }
    // Dodati datum kao objekt ili niz    
    function generatePatients() {
        let visit = Math.ceil(Math.random()*3);
        patient.ime = generate(ime);
        patient.prezime = generate(prezime);
        patient.email = `${patient.ime}.${patient.prezime}@${generate(email)}.com`;
        patient.usluga = [];
        patient.stomatolog = [];
        patient.date = [];       
        for(let i=0; i<visit; i++) {
            patient.usluga.push(generate(usluga));
            patient.stomatolog.push(generate(stomatolog)); 
            do {
                patient.noWeekend = randomDate(new Date('2016-05-01'), new Date());
                } while (!patient.noWeekend);
            patient.date.push(`${new Date(patient.noWeekend).toDateString()} ${randTime[Math.floor(Math.random()*14)]}`);
        }  
        let randNum = ('0000' + randNumber()).slice(-7); 
        patient.username = `${patient.ime}${patient.prezime.slice(0,3)}`;
        patient.pass = `${patient.ime}${(randNumber() % 1000)}`;
        let phone = `${generate(mreza)}/${randNumber()}`;
        // patient.date = `${new Date(patient.date).toDateString()} ${randTime[Math.floor(Math.random()*14)]}`;
        let newPatient = new PatientData(patient.ime, patient.prezime, patient.email, phone, randNum, 
                         patient.usluga, patient.stomatolog, patient.date, patient.username, patient.pass);
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
        let dateTime = $("input[name='time']:checked").val();
        let username = $('#username').val();
        let password = $('#confPass').val();
        // let newStr = inputPhone.split(''); 
        // newStr.splice(3,0, '/');
        // newStr = newStr.join('');

        if (localStorage.getItem('listaPacijenata')) {
            allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
            allPatients.push(new PatientData(inputName, inputSurname, inputEmail, inputPhone, randNumber(), 
                                             pregled, stomat, dateTime, username, password));
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

    function createTable(val,len,add) {
        showTable.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        let tr1 = document.createElement('tr');
        thead.appendChild(tr1);
        for (let i = 0; i < val.length; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for (let j = 0; j < len; j++) { //Object.keys(val[0]).length - 1
                if (i == 0 && j == 0) {
                    let num = document.createElement('th');
                    num.innerHTML = 'Br.';
                    tr1.appendChild(num);
                }
                if(i == 0 && j == add) {
                    let addTh = document.createElement('th');
                    addTh.innerHTML = '+';
                    tr1.appendChild(addTh);
                }
                if(j == add) {
                    let add1 = document.createElement('td');
                    add1.className = 'expand';
                    add1.innerHTML = '+';
                    tr.appendChild(add1);
                }
                if (i == 0 && j != add) {
                    let th = document.createElement('th');
                    th.innerHTML = Object.keys(val[0])[j];
                    tr1.appendChild(th);
                }
                if (j == 0) {
                    let num = document.createElement('td');
                    num.innerHTML = i + 1;
                    tr.appendChild(num);
                }
                if(j != add) {
                let td = document.createElement('td');
                td.innerHTML = Object.values(val[i])[j];
                tr.appendChild(td);
                }
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
        createTable(allPatients,6,5);
        $('.expand').click(function() {
            remPrevTable();
            createTable(allPatients,8,-1);
        });
    });

    let filter = [];
    let values = [];
    let count = [];
    let search = ['#imePac', '#prezimePac', '#email', '#telefon', '#karton', '#usluga', '#stomatolog'];
    let searchValues = ['ime', 'prezime', 'email', 'telefon', 'brojKartona', 'usluga', 'stomatolog'];

    $('#filter').click(function () {
        remPrevTable();
        filter = [];
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i = 0; i < 8; i++) {
            values.push($(search[i]).val());
        }
        count = [];
        for(let c in values) {           
            if(values[c]) {
                count.push(values[c])
                console.log(count)
            }   
        }          
            // let nizNum = ['a','b','c','d','e','f','g','h']
            // let num = [0,1,2,3,4,5,6,7,8]    
        
            //      let x = {};  
            //      for(let i in nizNum) { 
            //          x[nizNum[i]] = num.slice();
            //      }    
               
        console.log(values.length)
        
        for (let i in allPatients) {
            for (let j=0;j<values.length;j++) {
                for (let k=0;k<searchValues.length;k++) {
                    let compare = (values[k] == allPatients[i][searchValues[k]])
                    let compare1 = (values[j] == allPatients[i][searchValues[j]] && j != k);
                    if (count.length == 1 && compare) {
                        filter.push(allPatients[i]);
                    } else if(count.length == 2 && compare && compare1) {                       
                        filter.push(allPatients[i]);
                    }                  
                }
                break;
            }
        }
        console.log(filter)

        filter.length ? createTable(filter,6,5) : $('.table h4').show();  
            $('.expand').click(function() {   
                remPrevTable();                   
                createTable(filter,8,-1);               
            });  
       
        values = [];
    });
    
    //date min today. max a year from now
    function dateLimit(oneYear) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();        

        dd < 10 && (dd = '0' + dd);
        mm < 10 && (mm = '0' + mm);
    
        return today = (yyyy + oneYear) + '-' + mm + '-' + dd;
    }   
    
    $("#date").attr("min", dateLimit(0));
    $("#date").attr("max", dateLimit(1));

    let userContent = document.querySelector('.table, .userContent'); //.table
    function userData(val) { 
        userContent.appendChild(table);
        // table.setAttribute('id', 'userTable');
        table.appendChild(tbody);
        for(let i=0; i<Object.keys(val).length - 2; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for(let j=0; j<2;j++) {
                if(j==0) {                   
                    let th = document.createElement('th');
                    th.innerHTML = Object.keys(val)[i];
                    tr.appendChild(th);
                } else {
                    let td = document.createElement('input'); //td
                    td.value = Object.values(val)[i];   //td.innerHTML
                    tr.appendChild(td);
                }
            }
        }
    }
    $('#userInfo').click(function(){
        userData(user[0]);
        user = [];
    });

    // let currentDate = new Date();  
    //     $("#date").val(currentDate);
    if(window.location.href.indexOf('login/zakazivanje')!= -1) {
        let dateVal = document.getElementById("date");
        dateVal.valueAsDate = new Date();
    }
    $('#date').on('input',function(e){
        var day = new Date(e.target.value).getDay();        
        if( day == 0 || day == 6){ 
            alert(`Odaberite radni dan u nedelji`)
            this.valueAsDate = new Date();
        } 
    });
    
    $('#date').change(function() {
        let newValue = new Date($('#date').val()).toDateString();
        $('#dateTime').text(newValue);

        $('.cont input').each(function() {
            $(this).attr('value', `${newValue} ${$(this).next().text()}`)
        })
    });
    function time() {
        // $('.time').append(`<button type="button" value="${$dateVal} ${startTime}:${minutes}0">${startTime}:${minutes}0</button>`);
        $('.time').append(`<label class="cont"><input type="radio" name="time" 
                            value = "${$dateVal} ${startTime}:${minutes}0">
                           <span>${startTime}:${minutes}0</span>
                           <span class="check"></span></label>`)   
    }
    $('.dateTime').prepend(`<button type="button" id="dateTime" disabled>${$dateVal}</button>`);
    
    function setTime(timeCall) {
        for(let i=1; i< 15; i++) {
            if(i % 2 !=0 && i != 1) {
                startTime++;   
            } 
            if(i % 2 != 0){
                minutes = 0;
                timeCall();          
            } else {
                minutes = 3
                timeCall();
            }   
            randTime.push(`${startTime}:${minutes}0`);     
        }
    }    

    function stateCheck(check) {
        (check.val().length > 0) ?
            check.addClass('valid'):               
            check.removeClass('valid');                
    }
    $('.box input').blur(function() {
        stateCheck($(this));       
    });
    
    let formId = ['usluge','userData','userLog','wrapDates']
    let headerText = ['Odaberite uslugu i stomatologa','Unesite podatke',
          'Korisnicko ime i lozinka','Odaberite datum i vreme pregleda'];
    $('.userData').hide();
    $('.wrapDates').hide();
    $('.userLog').hide();

    function schedule(num,num1,neg) {
        $('.next').click(function() {      
            for(let i=0; i<num; i++) {
                if($(this).closest('fieldset').hasClass(formId[i])) { 
                    $(`.${formId[i]}`).hide();
                    $(`.${formId[i+num1]}`).show();
                    $('#ul .active').next().is(':hidden')?
                    $(`#ul li:nth-child(${i+4})`).addClass('active'):                   
                    $('#ul .active').next().addClass('active');                  
                    $('.wrap1 h1').text(headerText[i+num1]);  
                }   
            }     
        });
        $('.prev').click(function() {   
            for(let i=0; i<4; i++) { 
                if($(this).closest('fieldset').hasClass(formId[i])) {
                    $(`.${formId[i]}`).hide();
                    $(`.${formId[i-num1]}`).show();
                    $(`#ul li:nth-child(${i+neg})`).removeClass('active');
                    $('.wrap1 h1').text(headerText[i-num1]);
                }
            }    
        });
    } 
    if(localStorage.getItem('loggedUser')){ 
        $('body').show();
        $('#ul li').css('width','50%');
        $('.userData form').hide();
        $('.userLog form').hide();
        $('#ul li:nth-child(2)').hide();
        $('#ul li:nth-child(3)').hide(); 
        schedule(2,3,1);           
        localStorage.removeItem("loggedUser"); //prebaciti nakon zakazanog termina
    } else {
        $('body').show();
        schedule(4,1,1);         
    }

});
