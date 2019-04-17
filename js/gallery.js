export function gallery() {
    
    let gallery = document.querySelector('.gallery');
    let slideImage = document.createElement('div');
    slideImage.className = 'slideImage';
    gallery.appendChild(slideImage);
    let sliderCont = document.createElement('div');
    sliderCont.className = 'sliderCont';
    gallery.appendChild(sliderCont);
    for (let i = 0; i < 4; i++) {
        let imageLink = document.createElement('a');            
        imageLink.setAttribute('id', 'cir' + i);
        sliderCont.appendChild(imageLink); 
        var image = document.createElement('img');
        image.setAttribute('src', './images/image' + i + '.jpg');
        image.setAttribute('id', 'i' + i);
        slideImage.appendChild(image);
        if (i != 0) {
            image.style.display = 'none';
        }
    }
    let arr = document.createElement('i');
    arr.className = 'fas fa-arrow-right';
    slideImage.appendChild(arr);
    let arr1 = document.createElement('i');
    arr1.className = 'fas fa-arrow-left';
    slideImage.appendChild(arr1);
    
    $(document).ready(function () {
        let c = 0;
        $('#cir' + c).css('background-color', '#0f3294');
        function levo() {
            if (c === 0) {
                $('#i' + c).hide("slide", { direction: "left" }, 1000);
                $('#cir' + c).css('background-color', 'rgb(214, 205, 205)');
                c = 4;
            }
            $('#i' + (c - 1)).fadeIn(700);
            $('#cir' + (c - 1)).css('background-color', '#0f3294');
            $('#i' + c).hide("slide", { direction: "left" }, 1000);
            $('#cir' + c).css('background-color', 'rgb(214, 205, 205)');
            c--;
        }
        function desno() {
            $('#cir' + c).next().css('background-color', '#0f3294');
            $('#cir' + c).css('background-color', 'rgb(214, 205, 205)');
            $('#i' + c).next().fadeIn(700);
            $('#i' + c).hide("slide", { direction: "right" }, 1000);
            c++;
            if (c === 4) {
                c = 0;
                $('#i' + c).fadeIn(700);
                $('#cir' + c).css('background-color', '#0f3294');
            }
        }   
        //pokretanje slika pri ucitavanju      
        $(window).on('load', function(){  
            console.log(`nesto`);                    
            stop = setInterval(desno, 2500);                
        }); 
        //kruzici klik         
        $('.sliderCont a').on('click', function(){
            clearInterval(stop); 
            $('.sliderCont a').css('background-color', 'rgb(214, 205, 205)');
            $(this).css('background-color', '#0f3294');
            $('.slideImage img').hide("slide", { direction: "down" }, 1000);
            c = $(this).attr('id').slice(-1);
            $('#i' + c).fadeIn(700);
            if($(this).attr('id').slice(-1) == 0) {
                c=0;
            }  
            //$(this).eq(0)             
        });         
        //onemogucen desni klik
        $(document).bind("contextmenu", function(e) {
            return false;
        });
        //klik nadesno
        $('.slideImage img, .fa-arrow-right').on('click', function() {
            desno();
            clearInterval(stop);   
        });
        //taster nadesno
        $(this).keydown(function(e) {
            if (e.which == 39) {
                desno();  
                clearInterval(stop);                  
            }
        });
        //klik nalevo           
        $('.fa-arrow-left').on('click', function() {
            levo();
            clearInterval(stop);   
        });
        //taster nalevo
        $(this).keydown(function(e) {
            if (e.which == 37) {
                levo();
                clearInterval(stop);   
            }
        });
        //desni klik nalevo
        $('slideImage img').contextmenu(function() {
            levo();
            clearInterval(stop);   
        });

    });
}