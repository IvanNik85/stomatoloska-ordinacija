export function gallery() {
    
    let gallery = document.querySelector('.gallery');
    let slideImage = document.createElement('div');
    slideImage.className = 'slideImage';
    gallery.appendChild(slideImage);
    let sliderCont = document.createElement('div');
    sliderCont.className = 'sliderCont';
    gallery.appendChild(sliderCont);
    for (let i = 0; i < 5; i++) {
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
    arr.className = 'fa fa-angle-right';
    slideImage.appendChild(arr);
    let arr1 = document.createElement('i');
    arr1.className = 'fa fa-angle-left';
    slideImage.appendChild(arr1);
    
    $(document).ready(function () {
        let c = 0;
        $('#cir' + c).css('background-color', '#1299b7');
        function levo() {
            if (c === 0) {
                $('#i' + c).hide("slide", { direction: "left" }, 1000);
                $('#cir' + c).css('background-color', 'rgb(214, 205, 205)');
                c = 5;
            }
            $('#i' + (c - 1)).fadeIn(700);
            $('#cir' + (c - 1)).css('background-color', '#1299b7');
            $('#i' + c).hide("slide", { direction: "left" }, 1000);
            $('#cir' + c).css('background-color', 'rgb(214, 205, 205)');
            c--;
        }
        function desno() {
            $('#cir' + c).next().css('background-color', '#1299b7');
            $('#cir' + c).css('background-color', 'rgb(214, 205, 205)');
            $('#i' + c).next().fadeIn(700);
            $('#i' + c).hide("slide", { direction: "right" }, 1000);
            c++;
            if (c === 5) {
                c = 0;
                $('#i' + c).fadeIn(700);
                $('#cir' + c).css('background-color', '#1299b7');
            }
        }   
          
        $(window).on('load', function(){ 
            stop = setInterval(desno, 2500);                
        }); 
              
        $('.sliderCont a').on('click', function(){
            clearInterval(stop); 
            $('.sliderCont a').css('background-color', 'rgb(214, 205, 205)');
            $(this).css('background-color', '#1299b7');
            $('.slideImage img').hide("slide", { direction: "down" }, 1000);
            c = $(this).attr('id').slice(-1);
            $('#i' + c).fadeIn(700);
            if($(this).attr('id').slice(-1) == 0) {
                c = 0;                
            }  
        });         
        
        $(document).bind("contextmenu", function(e) {
            return false;
        });
        
        $('.slideImage img, .fa-angle-right').on('click', function() {
            desno();
            clearInterval(stop);   
        });
      
        $(this).keydown(function(e) {
            if (e.which == 39) {
                desno();  
                clearInterval(stop);                  
            } else if(e.which == 37) {
                levo();
                clearInterval(stop);   
            }
        });
        
        $('.fa-angle-left').on('click', function() {
            levo();
            clearInterval(stop);   
        });        
       
        $('slideImage img').contextmenu(function() {
            levo();
            clearInterval(stop);   
        });

    });
}