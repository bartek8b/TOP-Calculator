const display = document.querySelector('#display');
const appendBtns = document.querySelectorAll('.appendBtn');
const signBtn = document.querySelector('.signBtn');
const operationBtns = document.querySelectorAll('.operationBtn');
const sqrtBtn = document.querySelector('.sqrtBtn');

const calculator = {

    memory: {
        num1: null,
        operator: null,        
        num2: null,
        result: 0,
        resetDisplay: false,
    },
    
    resetAll: function(){
        this.memory.num1 = null;
        this.memory.operator = null;
        this.memory.num2 = null; 
        this.memory.result = 0;
        this.memory.resetDisplay = true;
    },

    operate: function(a, b){
        if(this.memory.num1 !== null && this.memory.operator !==null && this.memory.num2 !== null){
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
                if(Math.abs(this.memory.result).toString().replace('.', '').length > 10){
                    let stringResult = this.memory.result.toString();
                    let isNegative = stringResult.includes('-') ? 1 : 0;
                    let fix = (10 - (stringResult.indexOf('.') - isNegative));
                    
                    this.memory.result = Number(this.memory.result.toFixed(fix));
                    display.textContent = this.memory.result;
                    this.memory.num1 = this.memory.result;
                    this.memory.num2 = null;

                    if(stringResult.includes('e')){
                        display.textContent = 'ERROR PREC'; 
                        this.resetAll();
                    }
                }

                else{
                    display.textContent = this.memory.result;
                    this.memory.num1 = this.memory.result;
                    this.memory.num2 = null;
                }                

            }            
            else{
                display.textContent = 'ERROR OVF'; 
                this.resetAll();
            }            
        }                    
    }        
}

display.textContent = calculator.memory.result;

appendBtns.forEach(btn => btn.addEventListener('click', () => {

    if(calculator.memory.resetDisplay){
        (btn.textContent === '.') ? display.textContent = '0.' : display.textContent = btn.textContent;        
        calculator.memory.resetDisplay = false;
    }
    
    else{
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
    }}

}));

signBtn.addEventListener('click', () => {
    
    if(display.textContent !== '0' && calculator.memory.resetDisplay === false){
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

    //TU BEDZIE KOD KTORY SPRAWI ZE PO = WYNIK ZMIENI SIE NA RESULT OP 

    calculator.memory.operator = btn.textContent;
    calculator.memory.resetDisplay = true;   

    // console.log(calculator.memory.num1);
    // console.log(calculator.memory.num2);
    // console.log(calculator.memory.operator);
    // console.log(calculator.memory.result);
    
}));

sqrtBtn.addEventListener('click', () => {

    if(Number(display.textContent) >= 0){

    let sqrt = Math.sqrt(Number(display.textContent));

        if(Math.abs(sqrt).toString().replace('.', '').length > 10){
            let stringResult = sqrt.toString();
            let isNegative = stringResult.includes('-') ? 1 : 0;
            let fix = (10 - (stringResult.indexOf('.') - isNegative));
        
            display.textContent = Number(sqrt.toFixed(fix));
        }
        else{
            display.textContent = sqrt;
        }

    }

    else{
        display.textContent = 'ERROR SQRT'; 
        calculator.resetAll();
    }

    
})
