import { navMeni} from './navbarMenu.js';
import { gallery} from './gallery.js';

if(window.location.href.indexOf('/login/')!= -1) {    
    navMeni('.', '');    
} else {
    navMeni('', '/login');  
}
if(window.location.href.indexOf('/login/')== -1) {
    gallery();
}

$(document).ready(function () { 
    let admName = 'Ivan';
    let admPass = 'nik';
    let user = [];
    let loggedUser;
    let loggedAdmin;
    let changeUser = {};
    let startTime = 10;
    let randTime = [];
    let minutes;
    let $dateVal = new Date().toDateString(); 
    setTime(time);
    let parms = [admName, admPass, '#imeAdm', '#passAdm'];    
    
    localStorage.getItem('loggedUser')?
    loggedUser = JSON.parse(localStorage.getItem('loggedUser')): 
    loggedUser = [];
    
    localStorage.getItem('loggedAdmin')?
    loggedAdmin = JSON.parse(localStorage.getItem('loggedAdmin')): 
    loggedAdmin = '';    
   
    $('#submitAdmin').click(function () {
        refactorAdmin();
    });

    $('#imeAdm, #passAdm').keypress(enterAdm);   
    function enterAdm(event) {
        event.which == 13 && refactorAdmin();
    }    

    function refactorAdmin() {
        if(loggedUser[0]) {   
            Swal.fire({
                title: 'Greška!',
                text: 'Niste se izlogovali!',
                type: 'error',
                confirmButtonText: 'Ok'
              })                
            return;
        }
        if($('#imeAdm').val() == admName && $('#passAdm').val() == admPass) {
            potvrda(...parms);
            loggedAdmin = admName;
            localStorage.setItem('loggedAdmin', JSON.stringify(loggedAdmin));
            $('.dropdown span').text(loggedAdmin);
            $('#logout').show();                                
        } else {
            nijePotvrda(...parms);
        }
    }
    
    function potvrda(a, b, c, d) {         
        if ($(c).val() == a && $(d).val() == b) {           
            $('.toggle').hide();
            $('.content').show();
            $('.wrapImg').css('backgroundColor',' rgba(0, 0, 0, .8)'); 
        } 
    }
    function nijePotvrda(a, b, c, d) {
        if ($(c).val() != a || $(d).val() != b) {
            $(c).attr('placeholder', 'Molimo unesite ime');
            $(d).attr('placeholder', 'Molimo unesite password');
            $('.box label').hide();
            setTimeout(function () {
                Swal.fire({
                    title: 'Neispravno ime ili password!',
                    text: 'Pokušajte ponovo!',
                    type: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#0cb999',
                  }) 
            }, 20);
            setTimeout(function () {
                $('#imeAdm, #passAdm').removeAttr('placeholder');
                $('#ime, #pass').removeAttr('placeholder');
                $('.box label').show();
            }, 1500)
        }
    }  
   
    $('#submit').click(function () {
        refactorUser();      
    });

    $('#ime, #pass').keypress(enter);
    function enter(event) {
        event.which == 13 && refactorUser();
    }    

    function refactorUser() {
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i in allPatients) {
            let username = allPatients[i].username;
            let password = allPatients[i].pass;
            var parUser = [username, password, '#ime', '#pass'];
            if(loggedAdmin) {
                Swal.fire({
                    title: 'Greška!',
                    text: 'Niste se izlogovali!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                  }) 
                return;
            }
            if (username == $('#ime').val() && password == $('#pass').val()) {               
                loggedUser.push(allPatients[i]);
                localStorage.setItem('loggedUser',JSON.stringify(loggedUser));
                $('.dropdown span').text(loggedUser[0].ime);
                $('#logout').show();                                
                potvrda(...parUser);                
                break;
            }     
        }
        nijePotvrda(...parUser);  
    }

    $('#scrollTop').click(topFunction);
    window.onscroll = function () {
         scrollFunction();
         changeColor();        
         }
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 1850) {          
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
        constructor(ime, prezime, email, telefon, brojKartona, usluga, stomatolog, datum, username, password) {
            super(ime, prezime, email, telefon, brojKartona);
            this.usluga = usluga;
            this.stomatolog = stomatolog;
            this.datum = datum;
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
       
    function generatePatients() {
        let visit = Math.ceil(Math.random()*3);
        patient.ime = generate(ime);
        patient.prezime = generate(prezime);
        patient.email = `${patient.ime}.${patient.prezime}@${generate(email)}.com`;
        patient.usluga = [];
        patient.stomatolog = [];
        patient.datum = [];       
        for(let i=0; i<visit; i++) {
            patient.usluga.push(generate(usluga));
            patient.stomatolog.push(generate(stomatolog)); 
            do {
                patient.noWeekend = randomDate(new Date('2016-05-01'), new Date());
                } while (!patient.noWeekend); 
            patient.datum.push(`${new Date(patient.noWeekend).toDateString()} ${randTime[Math.floor(Math.random()*14)]}`);
        }  
        let randNum = ('0000' + randNumber()).slice(-7); 
        patient.username = `${patient.ime}${patient.prezime.slice(0,3)}`;
        patient.pass = `${patient.ime}${(randNumber() % 1000)}`;
        let phone = `${generate(mreza)}/${randNumber()}`;        
        let newPatient = new PatientData(patient.ime, patient.prezime, patient.email, phone, randNum, 
                         patient.usluga, patient.stomatolog, patient.datum, patient.username, patient.pass);
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
    
    if (!localStorage.getItem('listaPacijenata')) {
        let myJSON = JSON.stringify(allPatients);
        localStorage.setItem('listaPacijenata', myJSON);
    }
    let set = () => localStorage.setItem('listaPacijenata', JSON.stringify(allPatients));
    allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));  

    $('.finish').click(function () {
        let inputName = $('#ime1').val();
        let inputSurname = $('#prezime1').val();
        let inputEmail = $('#email1').val();
        let phone = $('#phone').val();
        let insertSlash = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
        let inputPhone = insertSlash(phone, '/', 3);
        let pregled = [$('#pregled').val()];
        let stomat = [$('#stomat').val()];
        let dateTime = [$("input[name='time']:checked").val()];
        let username = $('#username').val();
        let password = $('#confPass').val(); 

        $(this).click(function() {
            disableButtons($('#dateTime').html());
        });

        if(dateTime[0]==null) {
            Swal.fire({
                title: 'Nije uneto vreme',
                text: 'Pokušajte ponovo!',
                type: 'error',
                confirmButtonText: 'Ok'
              })             
            return;
        }
        for(let i in allPatients) {
            if(loggedUser[0] && loggedUser[0].ime == allPatients[i].ime && 
                loggedUser[0].prezime == allPatients[i].prezime ) {
                allPatients.splice(i,1);
                set();
                loggedUser[0]['datum'].push(dateTime[0]);
                loggedUser[0]['usluga'].push(pregled[0]);
                loggedUser[0]['stomatolog'].push(stomat[0]);
                allPatients.push(loggedUser[0]);
                set();
                return;      
            }
        }
        if (localStorage.getItem('listaPacijenata')) {
            allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
            allPatients.push(new PatientData(inputName, inputSurname, inputEmail, inputPhone, randNumber(), 
                                             pregled, stomat, dateTime, username, password));
            localStorage.setItem('listaPacijenata', JSON.stringify(allPatients));
            $("input, select").val('');
            location.reload();           
        } 
    });

    $('.next').click(function() {
        disableButtons($('#dateTime').html());
    });
    $('#date').on('input',function(e) { 
        disableButtons(new Date(e.target.value).toDateString());
    })
   
    function disableButtons(dateV) { 
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));        
        let cont = document.querySelectorAll('.time .cont'); 
        let c = 0;      
        while (c < 14) {
            cont[c].setAttribute('id','false'+c)
             cont[c].style.pointerEvents = 'auto';
            cont[c].style.border = '2px solid #d3d3d3';
            cont[c].style.backgroundColor = '#000';
            cont[c].firstElementChild.nextElementSibling.style.textDecoration = 'none';  
            cont[c].firstElementChild.disabled = false; 
            c++  
        }               
        for(let i in allPatients) {
            for(let j=0;j<14;j++) { 
                let timeVal = cont[j].firstElementChild.nextElementSibling;                         
                let dateT = `${dateV} ${timeVal.innerHTML}`; 
                if (allPatients[i].datum.includes(dateT)) {  
                    console.log(dateT)                           
                    cont[j].style.pointerEvents = 'none';
                    cont[j].style.border = '2px solid #ffc107';
                    cont[j].style.backgroundColor = '#d3d3d3';
                    timeVal.style.textDecoration = 'line-through';  
                    cont[j].firstElementChild.disabled = true; 
                } 
            }  
        }          
    }   

    let showTable = document.querySelector('.table');
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.setAttribute('class', 'patientsTable');

    function createTable(val,len,add,del) {
        showTable.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
        let tr1 = document.createElement('tr');
        thead.appendChild(tr1);
        for (let i = 0; i < val.length; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for (let j = 0; j < len; j++) { 
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
                if(i == 0 && j == del) {
                    let delTh = document.createElement('th');
                    delTh.innerHTML = '-';
                    tr1.appendChild(delTh);
                }
                if(j == add) {
                    let add1 = document.createElement('td');
                    add1.className = 'expand';
                    add1.innerHTML = '+';
                    tr.appendChild(add1);
                }
                if(j == del) {
                    let del = document.createElement('td');
                    del.className = 'delete';
                    del.innerHTML = '-';
                    tr.appendChild(del);
                }
                if (i == 0 && j != add && j != del) {
                    let th = document.createElement('th');
                    let capitalised = Object.keys(val[0])[j];
                    th.innerHTML = capitalised.charAt(0).toUpperCase() + capitalised.slice(1);
                    tr1.appendChild(th);
                }
                if (j == 0) {
                    let num = document.createElement('td');
                    num.innerHTML = i + 1;
                    tr.appendChild(num);
                }               
                if(j != add && j != del) {
                    let td = document.createElement('td');
                    td.innerHTML = Object.values(val[i])[j];
                    tr.appendChild(td);
                }
            }
        }   
        $('.patientsTable tbody tr').click(function(e){   
            if(($(e.target).hasClass('delete'))) {
                e.preventDefault();
            } else {
                remPrevTable();
                user.push(val[this.firstChild.innerHTML-1]); 
                userData(user[0]);
                let inputTable = document.querySelectorAll('tBody tr'); 
                inputTable[4].lastElementChild.disabled = true;
                user = [];
            }
        }); 
    }
    
    let generateUser = document.querySelector('.table, .generateUser'); 

    function userData(val) { 
        generateUser.appendChild(table);       
        table.appendChild(tbody);
        for(let i = 0; i < Object.keys(val).length - 2; i++) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            for(let j = 0; j < 2; j++) {
                if(j == 0) {                   
                    let th = document.createElement('th');
                    let capitalised = Object.keys(val)[i];
                    th.innerHTML = capitalised.charAt(0).toUpperCase() + capitalised.slice(1);
                    tr.appendChild(th);
                } else {
                    let td = document.createElement('input'); 
                    td.value = Object.values(val)[i];                      
                    tr.appendChild(td);
                }
            }
        }
        let btns = document.querySelector('.btnCont');
        generateUser.appendChild(btns)
        let backBtn = document.createElement('button');
        backBtn.innerHTML = 'Potvrdi izmene <i class="far fa-edit"></i>';
        backBtn.className = 'confirmBtn';
        backBtn.addEventListener('mouseover', icon1);
        backBtn.addEventListener('mouseleave', icon2);
        backBtn.addEventListener('click', editData);       
        btns.appendChild(backBtn);
        let back = document.createElement('button');
        back.innerHTML = '<i class="fas fa-angle-left"></i>';
        back.className = 'back';
        back.addEventListener('click', goBack);  
        btns.appendChild(back)
    }

    let icon1 = () =>  $('.confirmBtn i').addClass('fas fa-pen');  
    let icon2 = () => $('.confirmBtn i').removeClass('fas fa-pen');

    function goBack() {        
        remPrevTable();
        $('.userCont').slideDown(700);
        $('.generateUser').show();
        set();
    }
    
    function editData() {  
        let inputTable = document.querySelectorAll('tBody tr');                      
        for(let i in allPatients) { 
            for(let j = 0; j < inputTable.length; j++) {
                let value = inputTable[j].lastElementChild.value;  
                let key = inputTable[j].lastElementChild.previousElementSibling.innerHTML;                        
                key = key.charAt(0).toLowerCase() + key.slice(1);
                changeUser[key] = value;      
                if (!value) {                   
                    inputTable[j].lastElementChild.setAttribute('placeholder', 'Molimo unesite vrednost');
                    setTimeout(function() {    
                    inputTable[j].lastElementChild.setAttribute('placeholder', '');                
                }, 1300);
                    return;                   
                }           
                if (changeUser.brojKartona == allPatients[i].brojKartona) { 
                    changeUser['username'] =  allPatients[i].username;
                    changeUser['pass'] =  allPatients[i].pass;                 
                    allPatients.splice(i, 1);   
                    allPatients.push(changeUser);
                    loggedUser = [];
                    loggedUser.push(changeUser);
                    set();
                    break;                 
                }               
            }  
        } 
    }        

    $('#userInfo').click(function(){ 
        userData(loggedUser[0]);       
        let inputTable = document.querySelectorAll('tBody tr');
        inputTable[4].lastElementChild.disabled = true;
        $('.content').slideUp(700);             
    });

    function remPrevTable() {
        $('thead').empty();
        $('tbody').empty();
        $('.table h4').hide(); 
        $('.confirmBtn').remove();
        $('.back').remove();    
    }

    $('#allPatients').click(function () {
        remPrevTable();
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        createTable(allPatients,6,5,4);
        $('.expand').click(function() {           
            remPrevTable();
            createTable(allPatients,8);
        });  

        let tr = document.querySelectorAll('tr .delete'); 
        for(let i=0;i< tr.length; i++) {
            tr[i].addEventListener('click',deleteUser(allPatients, 'allPatients'));
        }
    });

    let filterEl = [];
    let values = [];
    let search = ['#imePac', '#prezimePac', '#email', '#telefon', '#karton', '#usluga', '#stomatolog'];
    let searchValues = ['ime', 'prezime', 'email', 'telefon', 'brojKartona', 'usluga', 'stomatolog'];

    $('#filter').click(function () {
        remPrevTable();
        filterEl = [];
        allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
        for (let i = 0; i < 8; i++) {
            values.push($(search[i]).val());
        }  
                
        filterEl = [...allPatients];

        for(let i = 0; i < 5; i++) {
            if(values[i]) {
                filterEl = filterEl.filter(function(value) {
                    if(values[i] === value[searchValues[i]]) {                      
                        return true;
                    } else {                        
                        return false;             
                    }
                });
                filterEl == false && $('.table h4').show(); 
            }
        }
        
        for(let i = 5; i < 7; i++) {            
            if(values[i]) {
                filterEl = filterEl.filter(function(value) {
                    let searchedValue = value[searchValues[i]];  
                    console.log(searchedValue);                
                    if(searchedValue.includes(values[i])) {
                        return true
                    } else {
                        return false;
                    }
                });
            }
        }      

        filterEl.length != allPatients.length ? createTable(filterEl,6,5,4) : $('.table h4').show();  
            $('.expand').click(function() {   
                remPrevTable();                   
                createTable(filterEl,8);               
            });  

        let tr1 = document.querySelectorAll('tr .delete');        
        for(let i=0;i< tr1.length; i++) {
            tr1[i].addEventListener('click',deleteUser(filterEl, 'filter'));
        }           
        values = [];
    });

    function deleteUser(value,text) { 
        return function() {           
            if(window.confirm(`Da li zelite da obrisete pacijenta?`)){
            $(this).parent().fadeOut(1300);           
                let b = this.parentElement.firstChild.innerHTML; 
                for(let i = value.length; i >= b; i--){                   
                    if(filterEl.length) {
                        for (let j in allPatients) {                            
                            (value[b-1].brojKartona == allPatients[j].brojKartona) &&                               
                            allPatients.splice(j, 1);                            
                        } 
                    } else {                       
                        allPatients.splice(b-1,1);                      
                    }
                    set();
                    setTimeout(function() {
                        document.getElementById(text).click()
                    }, 1000);
                    break;
                } 
            }
        }
    }      

    function dateLimit(oneYear) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; 
        let yyyy = today.getFullYear();        

        dd < 10 && (dd = '0' + dd);
        mm < 10 && (mm = '0' + mm);
    
        return today = (yyyy + oneYear) + '-' + mm + '-' + dd;
    }       
    $("#date").attr("min", dateLimit(0));
    $("#date").attr("max", dateLimit(1));
    
    if(window.location.href.indexOf('login/zakazivanje')!= -1) {
        let dateVal = document.getElementById("date");
        dateVal.valueAsDate = new Date();
    }
    $('#date').on('input',function(e){
        var day = new Date(e.target.value).getDay();        
        if( day == 0 || day == 6){ 
            Swal.fire({
                title: 'Greška!',
                text: 'Odaberite radni dan u nedelji',
                type: 'error',
                confirmButtonText: 'Ok'
              }) 
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
    //verifikacija input polja
    function stateCheck(check) {
        (check.val().length > 0) ?  
            check.addClass('valid'):               
            check.removeClass('valid');                
    }
    $('.box input').blur(function() {
        stateCheck($(this));       
    });

    $('#ime1,#prezime1').blur(function() {
        let str = $('#ime1').val();
        let str1 = $('#prezime1').val();
        let patt = /\d|\W|[_]/g;      
        if(str.match(patt) || str.length == 1) { 
            placeholder('#ime1', 'Molimo unesite ime');           
        }

        if(str1.match(patt) || str1.length == 1) { 
            placeholder('#prezime1', 'Molimo unesite prezime');
        }
    });    
    $('#email1').blur(function() {
        let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let str2 = $('#email1').val(); 
        if(!email.test(str2) && str2 != '') {
            placeholder(this, 'Molimo unesite validan email')
        }else {
            $(this).addClass('true'); 
        }
    });                    
    $('#phone').blur(function() {
        let phone=/^(\d{9,10}|\(\d{3}\)\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\/\d{3}-\d{4}|\d{3}\/\d{3}-\d{2}-\d{2}|\d{3}\/\d{6,7})$/;
        let str3 = $('#phone').val(); 
        if(!phone.test(str3) && str3 != '') {
            placeholder(this, 'Molimo unesite validan broj telefona'); 
        } else {
            $(this).addClass('true'); 
        }
    });

    function placeholder(id, text) {
        $(id).val('').attr('placeholder',text);
        setTimeout(function() {
            $(id).val('').attr('placeholder','');
            $(id).removeClass('valid');
        },1300)
    }  

    let confirm;
    let b = 0;
    $('.usluge .next').click(function() {
        if($("#pregled").val() && $("#stomat").val()) {
            confirm = 'true' 
        } else {   
            $('.usluge p').css('visibility','visible');
            setTimeout(function() {
                $('.usluge p').css('visibility','hidden');   
            }, 1300);              
            confirm = '';
        }       
    });    
    $('.userData .next').click(function() {
        confirm = '';   
        b=0;
        $('.userData input').each(function(){            
            if($(this).val() == '') { 
                confirm = '';  
                b++;         
                $(this).addClass('valid');   
                setTimeout(() => {
                    placeholder(this, 'Molimo popunite polje');
                }, 150)                 
                $(this).removeClass('true');
                console.log(b);
                return;
            } else if(b==0){
                confirm = 'true'; 
            }           
        });   
    });
    $('.userLog .next').click(function() {  
        let text;
        $('.userLog input').each(function(){ 
            text = 'Molimo popunite polje';
            if($(this).val() == ''){       
                $(this).addClass('valid');
                setTimeout(() => {
                    placeholder(this, text);
                }, 150); 
                confirm = '';
            } else if($("#passUser").val()!=$("#confPass").val()){  
                setTimeout(() => {
                    placeholder("#passUser", 'lozinke se ne poklapaju');   
                    placeholder("#confPass", 'lozinke se ne poklapaju');
                }, 150);  
            }  else if($("#username").val() == ''){
                $("#username").addClass('valid');
                setTimeout(() => {
                    placeholder("#username", text);
                }, 150); 
            } else {
                confirm = 'true';                
            }
        })  
    })

    let formId = ['usluge','userData','userLog','wrapDates']
    let headerText = ['Odaberite uslugu i stomatologa','Unesite podatke',
          'Korisnicko ime i lozinka','Odaberite datum i vreme pregleda'];
    $('.userData').hide();
    $('.wrapDates').hide();
    $('.userLog').hide();

    function schedule(num,num1,neg) {
        $('.next').click(function() {      
            for(let i=0; i<num; i++) {
                if($(this).closest('fieldset').hasClass(formId[i]) && confirm =='true') { 
                    confirm = '';
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
    if(loggedUser[0]){ 
        $('body').show();
        $('.wrapImg').css('backgroundColor',' rgba(0, 0, 0, .8)');
        $('#ul li').css('width','50%');
        $('.userData form').hide();
        $('.userLog form').hide();
        $('#ul li:nth-child(2)').hide();
        $('#ul li:nth-child(3)').hide(); 
        schedule(2,3,1); 
    } else {
        $('body').show();
        schedule(4,1,1);         
    }
   
    !localStorage.getItem('loggedUser') &&
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));  
    !localStorage.getItem('loggedAdmin') &&
    localStorage.setItem('loggedAdmin', JSON.stringify(loggedAdmin)); 

    loggedUser[0] && param(loggedUser[0].ime,'.user','.userCont');     
    loggedAdmin && param(loggedAdmin,'.admn','.admCont');
    
    function param(username,show,hide) {
        $('.dropdown span').text(username);
        $('#logout').show();
        $(show).hide();
        $(hide).show();
    }
    $('#logout').click(function() {              
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('loggedAdmin');
        loggedUser = [];
        loggedAdmin = '';
        location.reload();
        $('.dropdown span').text('Login');
        $('#logout').hide();
    }); 

    $('.card').click(function() {       
        let icon =  $(this).find('i');
        $('.stomatologPodaci').slideToggle();
        if(icon.hasClass('active1')){
            icon.removeClass('active1'); 
        } else if(icon.not('active1')){ 
            $('.card i').removeClass('active1');
            icon.addClass('active1');           
            for(let i of stomatolozi) {
                if($(this).attr('id') == i.id){                   
                    setTimeout(prikazi, 300);
                    function prikazi() {                    
                        $('.stomatologPodaci h4').html(i.ime);
                        $('.stomatologPodaci p').html(i.p);
                        $('.stomatologPodaci').slideDown();
                    }  
                }
            }  
        } 
     });    
     $('.stomatologPodaci i').click(function() {
        $('.stomatologPodaci').slideUp();        
     }); 

     let dr1 = {
        id: 'dr1',
        ime: 'Dr Ana Rebic',       
         p: 'Stomatološki fakultet u Beogradu završila je 2008.godine. U toku akademske godine 2007/2008 učestvovala je na fakultetu u izvođenju praktične nastave kao demonstrator na predmetu Bolesti zuba kao i u studentskim naučno-istraživačkim radovima. Završila kurs za mašinsku preparaciju kanala korena zuba i svakodnevno ga primenjuje u praksi.<br/><br/> Doktorsku disertaciju iz naučne oblasti Stomatološka protetika na temu:” Polimorfizmi u MTHFR, GSTM1, GSTT1, MMP9 genima kao faktori predispozicije za pojavu temporomandibularnih disfunkcija” odbranila je 2016.godine. Bavi se dijagnostikom i terapijom problema sa viličnim zglobom. Specijalizaciju iz stomatološke protetike završila je 2017.godine takođe na Stomatološkom fakultetu Univerziteta u Beogradu. Bila je angažovana na projektu Ministarstva za nauku i tehnološki razvoj Republike Srbije (2011-2017) u okviru kojeg je publikovala brojne radove u naučnim i stručnim časopisima i učestvovala u brojnim naučnim skupovima. Član je evropske asocijacije za oseointegraciju EAO. Intenzivno se usavršava i primenjuje znanja iz oblasti implantologije, konvencionalne protetike, protetike na implantatima i estetske stomatologije.'
     }
     let dr2 = {
        id: 'dr2',
        ime: 'Dr Milan Stankovic',
        p: 'Stomatološki fakultet završio je u Beogradu 2002. godine. Specijalizaciju iz Oralne Hirurgije završio je 2010. godine takodje na Stomatološkom fakultetu u Beogradu. Konstantno se usavršava iz oblasti implantologije i pohađao je više kurseva u zemlji i inostranstvu.<br/><br/> Od naročitog značaja su sinus lift procedure i druge augmentacione metode uz ugradnju implantata koje je stekao u Švajcarskoj na Univerzitetu u Bernu 2016. godine. Učestvovao na mnogim evropskim kongresima i član je evropske asocijacije za oseointegraciju EAO kao i Sekcije za oralnu hirurgiju i implantologiju. Svakodnevno primenjuje savremene hirurške procedure u okviru preprotetske pripreme i ima izuzetne rezultate u implantološko-protetskoj rehabilitaciji pacijenata.'
    }

    let dr3 = {
        id: 'dr3',
        ime: 'Dr Marijana Cvetkovic',
        p: 'Diplomirala na Stomatološkom fakultetu u Beogradu 2010. godine. Akademske specijalističke studije iz Bolesti zuba na temu:“ Kompleksnost kanalne građe donjih premolara” završila je na Stomatološkom fakultetu u Beogradu 2015.godine. <br/><br/>U okviru kliničke prakse najviše je posvećena konzervativnoj stomatologiji kao što su popravka, izbeljivanje i lečenje zuba primenjujući savremene tehnike mašinske preparacije kanala korena zuba kao i slaganja boja kompozitnih ispuna (belih plombi). Pohađa dodatne kurseve iz oblasti endodoncije i prati inovacije savremenih materijala i procedura u stomatologiji.'
    }
    let stomatolozi = [dr1, dr2, dr3];    
    
    function changeColor() {
        if ($(window).scrollTop() > 2700) {           
            $('.choiseDent .fa-calendar-alt').animate({
                'color': 'rgb(231, 248, 132)',
                'font-size': '30px',
            }, 1200);
            $('.choiseDent .fa-dollar-sign').animate({
                'color': 'rgb(248, 132, 142)',
                'font-size': '30px',
            }, 1200);
            $('.choiseDent .fa-cogs').animate({
                'color': 'rgb(132, 244, 248)',
                'font-size': '30px',
            }, 1200);
        } 
    }   
   
});
