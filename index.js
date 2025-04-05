const display = document.querySelector('#display');
const appendBtns = document.querySelectorAll('.appendBtn');

const calculator = {

    memory: {
        num1: null,
        operator: null,
        num2: null,
    },

    display: 0,

    calculate: function(){
        
    }

}

appendBtns.forEach(btn => btn.addEventListener('click', () => {

    if(display.innerHTML === '0' && btn.innerHTML !== '.'){
        display.innerHTML = btn.innerHTML;
    }
    else{
        display.innerHTML += btn.innerHTML;
    }
    
}))

