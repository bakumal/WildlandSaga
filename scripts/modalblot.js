var vid = document.getElementById("myVideo"); 

function playVid() { 
    vid.play(); 
} 

$('.button').click(function(){
    $(this).fadeOut(500);

    setTimeout(function(){
        playVid();
    },800);
 
    setTimeout(function(){
        $('h1,.container_inner img,a').css('opacity','1');
        $('p').css('opacity','.6');
    },1700);
});