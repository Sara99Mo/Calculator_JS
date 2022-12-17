// Add active class for button clicked
$(document).on('click' , '.btnactive' , function(){
    $(this).addClass('active').siblings().removeClass('active');
});

function notActive() {      
    [...document.querySelectorAll('.btnactive')].map(btn => {
        btn.classList.remove('active');
    })
}

// Numbers Value
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');

const add = document.getElementById('add');
const sub = document.getElementById('sub');
const mult = document.getElementById('mult');
const div = document.getElementById('div');
const mod = document.getElementById('mod');
const clear = document.getElementById('clear');
const power = document.getElementById('power');
const root = document.getElementById('root');
const fact = document.getElementById('fact');
const pow = document.getElementById('pow');
const sin = document.getElementById('sin');
const cos = document.getElementById('cos');
const tan = document.getElementById('tan');
const a_sin = document.getElementById('asin');
const a_cos = document.getElementById('acos');
const a_tan = document.getElementById('atan');

const historyBtn = document.getElementById('history'); 
const clearAll = document.getElementById('clearAll');

const res = document.getElementById('result');
const hArea = document.getElementById('historyArea');
const hData = document.getElementById('historyData');
const count = document.getElementById('count');


let result;
let data;

if (localStorage.data) {
    data = JSON.parse(localStorage.data);
} else {
    data = [];
}

// scroll up smooth
function scrollUp() {
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// Equal function
function equalFun(o , result) { 
    let n1 = num1.value;
    let n2 = num2.value;
    result = Math.floor(result * 100) / 100;
    let resl;
    if (o == 'sin' || o == 'cos' || o == 'tan'){
        if(result > 1) {
            result = `<i class="fas fa-infinity"></i>`;
        }
    }
    if (n1 != '' && n2 != '') {
        resl = `${n1} ${o} ${n2} = ${result}`;
        data.push(resl);
        localStorage.setItem('data' , JSON.stringify(data));
        showData();
    } else if (n1 != '' && n2 == '') { 
            resl = `${o} ${n1} = ${result}`;
            data.push(resl);
            localStorage.setItem('data' , JSON.stringify(data));
            showData();
    } else {
        resl = 'Please, Enter the Number..';
    }
    res.innerHTML = resl;
}

// Sum -> num1 + num2
add.onclick = sumNumber;

function sumNumber() {
    result = +num1.value + +num2.value;
    equalFun('+' , result);
    scrollUp();
}

// Sub -> num1 - num2
sub.onclick = subNumber;

function subNumber() {
    if (num2.value == '') {
        num2.value = 0;
    }
    result = +num1.value - +num2.value;
    equalFun('-' , result);
    scrollUp();
}

// Multi -> num1 * num2
mult.onclick = multNumber;

function multNumber() {
    if (num2.value == '') {
        num2.value = 1;
    }
    result = +num1.value * +num2.value;
    equalFun('*' , result);
    scrollUp();
}

// Div -> num1 / num2
div.onclick = divNumber;

function divNumber() {
    if (num2.value == '') {
        num2.value = 1;
    }
    if (num2.value != 0) {     
        result = +num1.value / +num2.value;
        equalFun('/' , result);
    } else {
        result = `<i class="fas fa-infinity"></i>`;
        equalFun('/' , result);
    }
    scrollUp();
}

// Mod -> num1 % num2
mod.onclick = modNumber;

function modNumber() {
    if (num2.value == '') {
        num2.value = 1;
    }
    result = +num1.value % +num2.value;
    equalFun('%' , result);
    scrollUp();
}

// Power -> num1 ^ num2
power.onclick =  powerNumber;

function  powerNumber() {
    if (num2.value == '') {
        num2.value = 1;
    }
    result = Math.pow(+num1.value , +num2.value);
    equalFun('^' , result);
    scrollUp();
}

// Root -> num1 ^ (1/num2)
root.onclick =  rootNumber;

function  rootNumber() {
    if (num2.value == '') {
        num2.value = 2;
    }
    result = Math.pow(+num1.value , (1 / +num2.value));
    equalFun('<i class="fas fa-square-root-variable"></i>' , result);
    scrollUp();
}

// hide input num2
function  oneNumber() {
    num2.style.display = 'none';
    num1.placeholder = 'Enter Number...';
    num2.value = '';
    scrollUp();
}

// Factorial -> n * (n-1) * ... * 1
fact.onclick =  factorial;

function factorial() {
    oneNumber();
    result = +num1.value;
    for(let i=result-1 ; i>0 ; i--){
        result *= i;  
    }
    equalFun('!' , result);
}

// Multi -> num1 * num2
pow.onclick = divByOne;

function divByOne() {
    oneNumber();
    result = 1 / +num1.value;
    equalFun('1 /' , result);
}

// Sin -> sin(n)
sin.onclick = sinFun;

function sinFun() {
    oneNumber();
    c = convertAngle('c' , +num1.value);
    result = Math.sin(c);    
    equalFun('sin' , result);
}

// cos -> cos(n)
cos.onclick = cosFun;

function cosFun() {
    oneNumber();
    c = convertAngle('c' , +num1.value);
    result = Math.cos(c);    
    equalFun('cos' , result);
}

// tan -> tan(n)
tan.onclick = tanFun;

function tanFun() {
    oneNumber();
    c = convertAngle('c' , +num1.value);
    result = Math.tan(c);    
    equalFun('tan' , result);
}

// asin => angle = asin(n)
a_sin.onclick = asinFun;

function asinFun() {
    oneNumber(); 
    result = Math.asin(+num1.value);
    d = convertAngle('d' , result);    
    equalFun('asin' , d);
}

// acos => angle = acos(n)
a_cos.onclick = acosFun;

function acosFun() {
    oneNumber(); 
    result = Math.acos(+num1.value);
    d = convertAngle('d' , result);    
    equalFun('asin' , d);
}

// atan => angle = atan(n)
a_tan.onclick = atanFun;

function atanFun() {
    oneNumber();
    result = Math.atan(+num1.value);    
    d = convertAngle('d' , result);
    equalFun('atan' , d);
}

// convert angle to circle 
function convertAngle(i , a) {
    if(i === 'c') {
        r = (a * Math.PI) / 180;
    } else {
        r = (a * 180) / Math.PI;
    }
    return r;
}
 
// Clear Value
clear.onclick = ClearValue;

function ClearValue() {
    num1.value = '';
    num2.value = '';
    res.innerHTML = '';    
    num2.style.display = 'block';
    num1.placeholder = 'Enter First Number';
    notActive();
    scrollUp();
}

// Show History Area 
historyBtn.addEventListener('click' , function() {
    hArea.classList.toggle('hActive');
    this.scrollIntoView({
        behavior: "smooth",
    })
});

// Show Data in History Area 
function showData() {
    let list = '';
    if (data.length > 0) {
        data.map(d => {
            list += `
                <li>${d}</li>
            `;
        });
    } else {
        list = 'No Data in the history';
    }
    hData.innerHTML = list;
    count.innerHTML = `(${data.length})`;
} 

// Clear All Data in the history area
clearAll.onclick = function() {
    if(confirm('Are you sure you need clear data?!')){
        localStorage.clear();
        data.splice(0);
    }
    showData();
}
showData();


