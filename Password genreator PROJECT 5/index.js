const lengthSlider =document.querySelector(".password_length input");
const options=document.querySelectorAll(".option input");
const copyIcon = document.querySelector('.input_box span');
const showPass= document.querySelector('.input_box input');
const password_indicator=document.querySelector('.password_indicator');
const btnSubmit =document.querySelector('.generate-btn');


const Characters= {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword=()=>{
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,   
    passLength = lengthSlider.value;

    options.forEach(option => {
           if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !=="spaces"){
                staticPassword += Characters[option.id];
            }
            else if(option.id === "spaces"){
                staticPassword += `  ${staticPassword}  `
            }
            else{
                excludeDuplicate = true; 
            }
           }        
    });
    
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    showPass.value = randomPassword;
}


const updatePassIndicator = () => {
    password_indicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".password_length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(showPass.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}


copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
btnSubmit.addEventListener("click",generatePassword );







