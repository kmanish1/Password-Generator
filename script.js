const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numberCheck = document.querySelector("#numbers")
const symbolCheck = document.querySelector("#symbols")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generate-password")
const allCheckBox = document.querySelectorAll("input[type = checkbox]")

let password="";
let passwordLength = 0;
const symbols = "!@#$%^&*()_+-{}[]\|`~;:',<.>/?="

console.log(generateSymbol());

//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor = color;
}
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    return symbols[getRndInteger(0,30)];
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked){
        hasUpper=true;
    }
    if(lowercaseCheck.checked){
        hasLower=true;
    }
    if(numberCheck.checked){
        hasNum=true;
    }
    if(symbolCheck.checked){
        hasSym=true;
    }
    if(hasSym && passwordLength>=6){
        setIndicator("#0f0")
    }
    else if(passwordLength>4){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00")
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied!";
    }
    catch(e){
        copyMsg.innerText="Failed"
    }
    setTimeout(function(){
        copyMsg.innerText="";
    },1000)
    
    // copyMsg.classList.add("active");
    // setTimeout(function(){
    //     copyMsg.classList.remove("active");
    // },2000)
    
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach(function(checkbox){
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change',handleCheckBoxChange);
})
inputSlider.addEventListener('input',function(e){
    passwordLength=e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',function(){
    if(passwordDisplay.value){
        copyContent();
    }
})
generateBtn.addEventListener('click',function(){
    if(checkCount <= 0){
        return
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider()
    }

    //remove old password
    password=""
    
    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase)
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase)
    }
    if(numberCheck.checked){
        funcArr.push(generateRandomNumber)
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol)
    }
    for(i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    for(let j=0;j<passwordLength-funcArr.length;j++){
        // let randIndex = getRndInteger(0,funcArr.length)
        password+=funcArr[getRndInteger(0,funcArr.length)]();
    }
    // for(i=0;i<passwordLength;i++){
    //     password+=funcArr[getRndInteger(0,funcArr.length)]
    // }
    //shuffling password
    // password=shufflePassword()
    passwordDisplay.value=password;
    calcStrength()
})
