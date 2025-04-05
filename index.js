const display = document.querySelector('#display');
const appendBtns = document.querySelectorAll('.appendBtn');
const signBtn = document.querySelector('.signBtn');
const clearBtns = document.querySelectorAll('.clearBtn');

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

    if((!(display.textContent.includes('.')) && (display.textContent.length < 10)) || (display.textContent.includes('.')) && (display.textContent.length <= 10)){

        if(display.textContent === '0' && btn.textContent !== '.'){
            display.textContent = btn.textContent;
        }
        else{
            if(!(btn.textContent === '.' && display.textContent.includes('.'))){
                display.textContent += btn.textContent;
            }       
        }

    }
    
}))

signBtn.addEventListener('click', () => {
    
    if(display.textContent !== '0'){
        (!display.textContent.includes('-')) ? display.textContent = `-${display.textContent}` : display.textContent = display.textContent.slice(1); 
    } 
       

})

