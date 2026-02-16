'use strict'
document.querySelector('.btn1').addEventListener('click',function(){
    let thePrin = Number(document.querySelector('.input1').value);
    let theTime = Number(document.querySelector('.input2').value);
    let theRate = Number(document.querySelector('.input3').value);

    let total = thePrin*(1+theRate)**theTime
    document.querySelector('.output').value = Math.round(total*100)/100;
})