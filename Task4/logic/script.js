function checkPalindrome(){
    let input = document.getElementById('pi').value;

    let left = 0;
    let right = input.length-1;
    let pal = true;

    while(left<right){
        if(input[left] !== input[right]){
            pal = false;
            break;
        }
        left++;
        right--;
    }
    if(pal){
        document.getElementById('pr').innerText = "it is a palindrome";
    }
    else{
        document.getElementById('pr').innerText = "it is not a palindrome";
    }

}

function checkArmstrong(){

    let num = document.getElementById('ai').value;

    let original = num;
    let sum = 0;
    let temp = num;
    let digits = 0;

    while(temp>0){
        digits++;
        temp = Math.floor(temp/10);
    }

    temp = num;
    
    while(temp>0){
        let rem = temp % 10;
        
        let pow =1;
        for(let i = 0; i < digits; i++){
            pow *= rem;
        }
        sum += pow;
        temp = Math.floor(temp/10);
    }
    console.log(sum);
    if(sum == original){
        document.getElementById('ar').innerText = "it is a Armstrong number";
    }
    else{
        document.getElementById('ar').innerText = "it is not a Armstrong number";
    }
}

function findGreatest(){
    let n1 = Number(document.getElementById('n1').value);
    let n2 = Number(document.getElementById('n2').value);
    let n3 = Number(document.getElementById('n3').value);
    let n4 = Number(document.getElementById('n4').value);

    let greatest = n1;

    if(n2 > greatest) greatest = n2;
    if(n3 > greatest) greatest = n3;
    if(n4 > greatest) greatest = n4;

    document.getElementById('gr').innerHTML = "Greatest Number:" + greatest;
}