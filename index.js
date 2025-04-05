const calculator = {

    memory: {
        num1: null,
        operator: null,
        num2: null,
    },

    display: 0,

    calculate: function(operator){
        switch(operator){
            case "+":
                return this.memory.num1 + this.memory.num2;
                break
            case "-":
                return this.memory.num1 - this.memory.num2;
                break
            case "*":
                return this.memory.num1 * this.memory.num2;
                break
            case ":":
                return this.memory.num1 / this.memory.num2;
                break;            
        }
    }

}

