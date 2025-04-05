const display = document.querySelector('#display');
const appendBtns = document.querySelectorAll('.appendBtn');
const signBtn = document.querySelector('.signBtn')

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

    if((!(display.innerHTML.includes('.')) && (display.innerHTML.length < 10))
        || (display.innerHTML.includes('.')) && (display.innerHTML.length <= 10)){

        if(display.innerHTML === '0' && btn.innerHTML !== '.'){
            display.innerHTML = btn.innerHTML;
        }
        else{
            if(!(btn.innerHTML === '.' && display.innerHTML.includes('.'))){
                display.innerHTML += btn.innerHTML;
            }       
        }

    }
    
}))

signBtn.addEventListener('click', () => {
    (!display.textContent.includes('-')) ? display.textContent = `-${display.textContent}` : display.textContent = display.textContent.slice(1);    
})

