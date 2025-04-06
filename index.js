const display = document.querySelector('#display');
const appendBtns = document.querySelectorAll('.appendBtn');
const signBtn = document.querySelector('.signBtn');
const operationBtns = document.querySelectorAll('.operationBtn');

const calculator = {

    memory: {
        num1: null,
        operator: null,
        num2: null,
        result: 0,
    },    

    operate: function(a, b){
        if(this.memory.num1 && this.memory.operator && this.memory.num2){
            switch (this.memory.operator){
                case '+':
                    this.memory.result = a + b;
                    break;
                case '-':
                    this.memory.result = a - b;
                    break;
                case '*':
                    this.memory.result = a * b;
                    break;
                case '/':
                    this.memory.result = a / b;
                    break;
            }
            display.textContent = this.memory.result;
            this.memory.num1 = this.memory.result;            
        }        
    }

}

display.textContent = calculator.memory.result;

appendBtns.forEach(btn => btn.addEventListener('click', () => {

    if((!display.textContent.includes('.') && !display.textContent.includes('-') && display.textContent.length < 10)
        || (display.textContent.includes('.') && !display.textContent.includes('-') && display.textContent.length < 11)
        || (!display.textContent.includes('.') && display.textContent.includes('-') && display.textContent.length < 11)
        || (display.textContent.includes('.') && display.textContent.includes('-') && display.textContent.length < 12)
    )
    
    {

        if(display.textContent === '0' && btn.textContent !== '.'){
            display.textContent = btn.textContent;
        }
        else{
            if(!(btn.textContent === '.' && display.textContent.includes('.'))){
                display.textContent += btn.textContent;
            }       
        }

    }
    
}));

signBtn.addEventListener('click', () => {
    
    if(display.textContent !== '0'){
        (!display.textContent.includes('-')) ? display.textContent = `-${display.textContent}` : display.textContent = display.textContent.slice(1); 
    } 
       

});

operationBtns.forEach(btn => btn.addEventListener('click', () => {

    if(!calculator.memory.num1){
        calculator.memory.num1 = Number(display.textContent);        
    }

    else if(calculator.memory.num1){
        calculator.memory.num2 = Number(display.textContent);    
    }    

    calculator.operate(calculator.memory.num1, calculator.memory.num2);
    calculator.memory.num2 = null;
    display.textContent = 0;

    calculator.memory.operator = btn.textContent;

    // console.log(calculator.memory.num1);
    // console.log(calculator.memory.num2);
    // console.log(calculator.memory.operator);
    // console.log(calculator.memory.result);
    
}));