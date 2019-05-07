// export function login() {     
//     let admName = 'ivan';
//     let admPass = 'nik';
//     let loggedUser;
//     let loggedAdmin; 
//     let parms = [admName, admPass, '#imeAdm', '#passAdm'];

//     localStorage.getItem('loggedUser')?
//     loggedUser = JSON.parse(localStorage.getItem('loggedUser')): 
//     loggedUser = [];
    
//     localStorage.getItem('loggedAdmin')?
//     loggedAdmin = JSON.parse(localStorage.getItem('loggedAdmin')): 
//     loggedAdmin = '';
//     //napomena - prilikom unosa imena korisnika koristiti toLowerCase
   
//     $('#submitAdmin').click(function () {
//         refactorAdmin();
//     });

//     $('#imeAdm, #passAdm').keypress(enterAdm);
//     // $(window).keypress(enter);
//     function enterAdm(event) {
//         event.which == 13 && refactorAdmin();
//     }    

//     function refactorAdmin() {
//         if(loggedUser[0]) {
//             alert(`Niste se izlogovali`);
//             return;
//         }
//         if($('#imeAdm').val() == admName && $('#passAdm').val() == admPass) {
//             potvrda(...parms);
//             loggedAdmin = admName;
//             localStorage.setItem('loggedAdmin', JSON.stringify(loggedAdmin));
//             $('.dropdown span').text(loggedAdmin);
//             $('#logout').show();                                
//         } else {
//             nijePotvrda(...parms);
//         }
//     }
    
//     function potvrda(a, b, c, d) { 
//         if ($(c).val() == a && $(d).val() == b) {
//             // $('ul li:last-child').hide().html(`<li><a href="##">Ivan</a></li>`);
//             $('.toggle').hide();
//             $('.content').show();
//         } 
//     }
//     function nijePotvrda(a, b, c, d) {
//         if ($(c).val() != a || $(d).val() != b) {
//             $(c).attr('placeholder', 'Molimo unesite ime');
//             $(d).attr('placeholder', 'Molimo unesite password');
//             $('.box label').hide();
//             setTimeout(function () {
//                 alert(`Neispravno ime ili password. Pokušajte ponovo!`)
//             }, 20);
//             setTimeout(function () {
//                 $('#imeAdm, #passAdm').removeAttr('placeholder');
//                 $('#ime, #pass').removeAttr('placeholder');
//                 $('.box label').show();
//             }, 1500)
//         }
//     }  
   
//     $('#submit').click(function () {
//         refactorUser();
//         // console.log(loggedUser[0].ime)
//     });

//     $('#ime, #pass').keypress(enter);
//     function enter(event) {
//         event.which == 13 && refactorUser();
//     }    

//     function refactorUser() {
//         allPatients = JSON.parse(localStorage.getItem('listaPacijenata'));
//         for (let i in allPatients) {
//             let username = allPatients[i].username;
//             let password = allPatients[i].pass;
//             var parUser = [username, password, '#ime', '#pass'];
//             if(loggedAdmin) {
//                 alert(`Niste se izlogovali`);
//                 return;
//             }
//             if (username == $('#ime').val() && password == $('#pass').val()) {               
//                 loggedUser.push(allPatients[i]);
//                 localStorage.setItem('loggedUser',JSON.stringify(loggedUser));
//                 $('.dropdown span').text(loggedUser[0].ime);
//                 $('#logout').show();                                
//                 potvrda(...parUser);                
//                 break;
//             }     
//         }
//         nijePotvrda(...parUser);  
//     }
// }