let num = "";
const display  = document.getElementById('display'); 

function updateDisplay(nums){
   if (nums === ""){
        display.value = "0";
   }else{
        display.value = nums;
   }
}

let value = " ";

function handleNumber(values){
    if(values === "."){
       let digits = num.split(/[\+\-\*\/]/);
       let ld = digits[digits.length - 1]
       
       if(ld.includes(".")){
        return;
       }
    }
    num += values;
    updateDisplay(num);
}

function handleOperator(op){
    if (num === ""){
        return
    }
    let lc = num[num.length -1];
    if ("+-*/%".includes(lc)){
        num = num.slice(0, -1) + op;
    }else{
        num += op;
    }
    updateDisplay(num);
}

function handleClear(){
    num = "";
    updateDisplay(num);
}

function handleBackspace(){
    if(num.length > 0){
        num = num.slice(0,-1);
    }
    updateDisplay(num);
}
/*
function handleEqual(){
    if (num === "") return;

    try{
        num = eval(num);
        updateDisplay(num);
    }catch{
        num = "";
        display.value = "Error"
    } 
}   */

function handleEqual(){

    num = num.replace(/\s/g, "");

    if(num === "") return;

    try{
        let numbers = num.split(/[\+\-\*\/]/).map(Number);
         console.log(numbers);

        if(numbers.some(n => isNaN(n))){
            display.value = "Error";
            num = "";
            return;
        }

        let operators = num.match(/[\+\-\*\/]/g);
          console.log(operators);
        if(!operators){
            num = numbers[0].toString();
            updateDisplay(num);
            return;
        }

        for(let i=0; i<operators.length; i++){
            if(operators[i] === "*" || operators[i] === "/") {
                if(operators[i] === "/" && numbers[i+1] === 0){
                    display.value = "Error";
                    num = "";
                    return;
                }

                let result = operators[i] === "*"? numbers[i] * numbers[i+1] : numbers[i] / numbers[i+1];
                numbers.splice(i, 2, result);
                operators.splice(i, 1);
                i--;
            }
        }

        let result = numbers[0];

        for(let i=0; i<operators.length; i++){
            if(operators[i] === "+"){
                result += numbers[i+1];
            }
            else{
                result -= numbers[i+1];
            }
        }
        num = result.toString();
        updateDisplay(num);
    }catch(error){
        console.log(console.error);
        display.value = "Error";
        num = "";
    }
}





