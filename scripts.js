player = document.getElementById("player");

document.addEventListener('mousemove', e => {
    
    x = e.clientX -50;
    y = e.clientY -50;
    player.style.top = y.toString()+"px";
    player.style.left = x.toString()+"px";
});