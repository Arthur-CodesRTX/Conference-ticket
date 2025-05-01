(function(){

    const body = document.querySelector(".wrapper")
    const ticket = document.querySelectorAll(".displayNone");
    const main = document.querySelector(".mainContainer");
    const headerTitle = document.querySelector(".headerTitle")
    const errors = document.querySelectorAll(".error");
    const btnTicket = document.querySelector(".ticketButton");
    const inputs = document.querySelectorAll(".formInputs");
    const inputEmail = document.querySelector("#inputEmail");
    const inputGit = document.querySelector("#inputGit");
    const titleMainCongrats = document.querySelector(".mainCongrats h1 span");
    const emailMainCongrats = document.querySelector(".mainCongrats h2 span");
    const titleProfile = document.querySelector(".ticketTextProfile h2");
    const textProfile = document.querySelector(".ticketTextProfile p a");
    const fileInput = document.querySelector("#fileInput");
    const imagePreview = document.querySelector("#preview");
    const UploadBox = document.querySelector(".mainUploadBox");
    const textUploadBox = document.querySelector(".mainUploadBox p");
    const mainUploadButtons = document.querySelector(".mainUploadButtons");
    const iconUpload = document.querySelector("#MainUploadIcon");
    const removeBtn = document.querySelector("#removeBtn");
    const changeBtn = document.querySelector("#changeBtn");
    const imgAvatar = document.querySelector("#imgAvatar")

    let selectedImage = null;

    btnTicket.addEventListener("click", renderTicket);
    inputs.forEach(input => input.addEventListener("input", detectLetter));
    fileInput.addEventListener("change", detectDropbox)
    removeBtn.addEventListener("click", removeImage)
    changeBtn.addEventListener("click", changeImage)
    
    function removeImage(){
        selectedImage = null
        imagePreview.src = ""
        imagePreview.style.display = "none"
        mainUploadButtons.style.display = "none"
        UploadBox.style.cursor = "pointer"
        fileInput.style.display = "flex"
        iconUpload.style.display = "flex"
        textUploadBox.style.display = "inline-block"
        fileInput.value = ""
    }

    function changeImage(){
        fileInput.value = "";
        fileInput.click();
        detectDropbox();
    }

    function detectDropbox(event){

        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e){
                selectedImage = e.target.result;
                iconUpload.style.display = "none";
                imagePreview.src = selectedImage;
                imagePreview.style.display = "flex";
                textUploadBox.style.display = "none";
                mainUploadButtons.style.display = "flex";
                UploadBox.style.backgroundColor = "rgb(75, 72, 106, 0.3)";
                UploadBox.style.cursor = "default";
                mainUploadButtons.style.justifyContent = "center";
                mainUploadButtons.style.gap = "1rem";
                fileInput.style.display = "none";
                imgAvatar.src !== "" ? imgAvatar.src = selectedImage : imgAvatar.src = ""
            }
           reader.readAsDataURL(file);
        }
    }

    function renderTicket(event){
        event.preventDefault()
        let allFiled = true;
        let inputsArr = [];
        [...inputs].map( input => {
            if(input.value === ""){  
               allFiled = false;
               inputsArr.push(allFiled);
            } else{
                allFiled = true;
                inputsArr.push(allFiled);
            }

            if(inputEmail.value.includes("@") !== false && inputGit.value.indexOf("@") === 0){
                allFiled = true;
                inputsArr.push(allFiled);
            } else{
                allFiled = false;
                inputsArr.push(allFiled);
            }

            if(inputsArr.includes(false)){
                allFiled = false;
            } 
        })

        for(let i = 0; i <= (inputs.length - 1); i++){
            if(allFiled === true){
                [...ticket].forEach(element => {
                    element.classList.remove("displayNone");
                });
                main.classList.add("displayNone");
                headerTitle.remove();
                body.style.height = "100vh";
                inputs[i].id === "inputName" ? titleMainCongrats.innerHTML = inputs[i].value : null;
                inputs[i].id === "inputEmail" ? emailMainCongrats.innerHTML = inputs[i].value : null;
                inputs[i].id === "inputName" ? titleProfile.innerHTML = inputs[i].value : null;
                inputs[i].id === "inputGit" ? textProfile.innerHTML += inputs[i].value : null;
            } else{
                [...errors].forEach(error => {
                    error.style.display = "flex";
                });
                [...inputs].forEach(input =>{
                    input.style.border = "1px solid hsl(7, 71%, 60%)";
                })
            } 
        }
    }

    function detectLetter(){
        let brother = this.nextElementSibling;
        brother.style.display = "none" 
        this.style.border = "1px solid #8784a4"    
    }
   
})()
