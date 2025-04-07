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
        resetDisplay: false,
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

            if(!(this.memory.result < -9999999999 || this.memory.result > 9999999999)){
                display.textContent = this.memory.result;
                this.memory.num1 = this.memory.result;
                this.memory.num2 = null;
            }            
            else{
                display.textContent = 'ERROR'; 
                this.memory.num1 = null;
                this.memory.operator = null;
                this.memory.num2 = null; 
                this.memory.result = 0;
                this.memory.resetDisplay = true;
            }
            
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
        //SPRAWDZIC TEN KOD
        if((display.textContent === '0' && btn.textContent !== '.') || (calculator.memory.resetDisplay)){
            display.textContent = btn.textContent;
            calculator.memory.resetDisplay = false;
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
        calculator.operate(calculator.memory.num1, calculator.memory.num2);
    }

    calculator.memory.operator = btn.textContent;
    calculator.memory.resetDisplay = true;   

    // console.log(calculator.memory.num1);
    // console.log(calculator.memory.num2);
    // console.log(calculator.memory.operator);
    // console.log(calculator.memory.result);
    
}));