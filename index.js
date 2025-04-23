const display = document.querySelector('#display');
const appendBtns = document.querySelectorAll('.appendBtn');
const signBtn = document.querySelector('.signBtn');
const operationBtns = document.querySelectorAll('.operationBtn');
const sqrtBtn = document.querySelector('.sqrtBtn');
const clearBtns = document.querySelectorAll('.clearBtn');

const calculator = {

    memory: {
        num1: null,
        operator: null,        
        num2: null,
        result: 0,
        resetDisplay: false,
        tempNum: null,
    },
    
    resetAll: function(){
        this.memory.num1 = null;
        this.memory.operator = null;
        this.memory.num2 = null; 
        this.memory.result = 0;
        this.memory.resetDisplay = true;
        this.memory.tempNum = null;
    },

    operate: function(a, b){
        if(this.memory.num1 !== null && this.memory.operator !==null){
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
                    if(b === 0){
                        display.textContent = 'ERROR DIV'; 
                        this.resetAll();
                        return;
                    }
                    break;
            }

            
            if (this.memory.result.toString().includes('e')) {
                display.textContent = 'ERROR PREC'; 
                this.resetAll();
                return;
            }

            if(!(Math.abs(this.memory.result) > 9999999999)){
                if(Math.abs(this.memory.result).toString().replace('.', '').length > 10){
                    let stringResult = this.memory.result.toString();
                    let isNegative = stringResult.includes('-') ? 1 : 0;
                    let fix = (10 - (stringResult.indexOf('.') - isNegative));
                    
                    this.memory.result = Number(this.memory.result.toFixed(fix));
                    display.textContent = this.memory.result;
                    this.memory.num1 = this.memory.result;
                    this.memory.num2 = null;
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

    if(calculator.memory.tempNum){
        calculator.resetAll();
    }

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

// Below is fixed with AI help - preciously operator other than '=' gave bug: disp.content /op./ disp. content.
// Captions in Polish
operationBtns.forEach(btn => btn.addEventListener('click', () => {
    if (!display.textContent.includes('ERROR')) {
        if (btn.textContent !== '=') {
            // Jeśli po "=" użytkownik wprowadza operator, traktujemy wynik jako num1
            if (calculator.memory.resetDisplay && calculator.memory.tempNum !== null) {
                calculator.memory.num1 = calculator.memory.result; // Ustaw wynik jako num1
                calculator.memory.num2 = null; // Wyzeruj num2, aby wprowadzić nową liczbę
                calculator.memory.tempNum = null; // Resetuj tempNum
            }

            // Jeśli resetDisplay jest włączony, zmieniamy operator bez obliczeń
            if (calculator.memory.num1 !== null && calculator.memory.resetDisplay) {
                calculator.memory.operator = btn.textContent;
            } else {
                if (calculator.memory.tempNum) {
                    calculator.memory.tempNum = null; // Reset temporary number
                } else {
                    if (!calculator.memory.num1) {
                        calculator.memory.num1 = Number(display.textContent);
                    } else {
                        calculator.memory.num2 = Number(display.textContent);
                        calculator.operate(calculator.memory.num1, calculator.memory.num2);
                    }
                }
                calculator.memory.operator = btn.textContent; // Ustaw operator
            }
        } else if (btn.textContent === '=' && calculator.memory.operator !== null) {
            if (calculator.memory.tempNum === null) {
                // Pierwsze naciśnięcie "=" - zapisujemy num2 jako tempNum
                calculator.memory.tempNum = Number(display.textContent);
                calculator.operate(calculator.memory.num1, calculator.memory.tempNum);
            } else {
                // Kolejne naciśnięcia "=" - używamy tempNum do powtarzania operacji
                calculator.operate(calculator.memory.num1, calculator.memory.tempNum);
            }

            // Przypisujemy wynik do num1, aby kontynuować operacje
            calculator.memory.num1 = calculator.memory.result;
        }

        calculator.memory.resetDisplay = true; // Flaga do resetu wyświetlacza
    }
}));

sqrtBtn.addEventListener('click', () => {

    if(!display.textContent.includes('ERROR')){
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
        
                if(calculator.memory.tempNum){
                    calculator.memory.tempNum = null
                }
        }
        
        else{
                display.textContent = 'ERROR SQRT'; 
                calculator.resetAll();
        }
    }     
});

clearBtns.forEach(btn => btn.addEventListener('click', () => {
    if(display.textContent.includes('ERROR') || btn.textContent === 'C' || calculator.memory.resetDisplay){
        calculator.resetAll();
        display.textContent = 0;
    }

    else if(btn.textContent !== 'C' && display.textContent !== '0'){
        
        if(display.textContent.toString().includes('-') === true && display.textContent.toString().length === 2){
            display.textContent = display.textContent.slice(-1);
        }
        else if(display.textContent.toString().length === 1) {
                display.textContent = 0;
        }
        else{
            display.textContent = display.textContent.slice(0, -1);
        }        
    }        
}
));