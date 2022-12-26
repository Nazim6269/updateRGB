window.onload = () => {
    div = null;
    main();
}

function main(){
    const cpButton = document.querySelector('#copyButton');
    const cpButtonTwo = document.querySelector('#copyButtonTwo');
    const chButton = document.querySelector('#changeButton');
    const body = document.querySelector('body');
    const input = document.querySelector('#inp');
    const inputTwo = document.querySelector('#inpTwo');


    
chButton.addEventListener('click',function(){
    const decColor = generateDecimalColor();
    const hexColor = generateHexColor(decColor);
    const RGBColor = generateRGBColor(decColor);
    input.value = hexColor.substring(1);
    inputTwo.value = RGBColor;
    body.style.backgroundColor = hexColor;

    if(div != null){
        div.remove();
        div = null;
    }
})

input.addEventListener('keyup',function(e){
    const color = e.target.value;
    if (color){
        input.value = color.toUpperCase();
    }
    if (isHexValid(color)){
        body.style.backgroundColor = `#${color}`;
        inputTwo.value = hexToRgb(color);
        
    }
})

cpButton.addEventListener('click', function(){
    navigator.clipboard.writeText(`#${input.value}`);
    if(div != null){
        div.remove();
        div = null;
    }


    if (isHexValid(input.value)){
    generateToastMessage(input.value);
    }else{alert(`Invalid color code`)}
})

cpButtonTwo.addEventListener('click', function(){
    navigator.clipboard.writeText(`${inputTwo.value}`);
    if(div != null){
        div.remove();
        div = null;
    }


    if (isHexValid(input.value)){
    generateToastMessage(inputTwo.value);
    }else{alert(`Invalid color code`)}
})

}



function generateDecimalColor(){
    let red = Math.round(Math.random()*255);
    let green = Math.round(Math.random()*255);
    let blue = Math.round(Math.random()*255);
    return {red,green,blue};
}


function generateHexColor({red,green,blue}){
   const getTwoCode =  (value) => {
    const hexCode = value.toString(16);
    return hexCode.length == 1 ? `0${hexCode}` : hexCode;
   }
    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}


function generateRGBColor({red,green,blue}){
    return `rgb(${red},${green},${blue})`;
}

function hexToRgb(hexCode){
    const red = parseInt(hexCode.slice(0, 2), 16);
    const green = parseInt(hexCode.slice(2, 4), 16);
    const blue = parseInt(hexCode.slice(4), 16);
    return `rgb(${red},${green},${blue}`;
}

function isHexValid(color){
    if (color.length != 6) return false;
    return /^[0-9A-fa-f]{6}$/i.test(color);
}


function  generateToastMessage(msg){
    div = document.createElement('div');
    div.className = 'toast-message toast-message-slide-in';
    div.innerHTML = `#${msg} copied`;
    div.addEventListener('click', function(){
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');
        div.addEventListener('animationend', function(){
            if(div != null){
                div.remove();
               div = null;
            }
        })
    })
    document.body.appendChild(div); 
}