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

appendBtns.forEach(btn => btn.addEventListener('click', () => 
    display.innerHTML === "0" ? display.innerHTML = btn.innerHTML : display.innerHTML += btn.innerHTML)
)

