
// Onload event to translate the page automatically if the tool was used 24h before

function translate() {

  const storedLanguage = localStorage.getItem('translation');

  // If there is a recorded translation
  if (storedLanguage !== null) {

    // Verify the expiration date of the local storage item
    const getStorage = JSON.parse(storedLanguage);
    const expiration = getStorage.expiration;
    const now = new Date().getTime();

    console.log(`LocalStorage expiration date : ${new Date(expiration)}`);

    if (now > expiration) {

      // Delete local storage item if the expiration date has passed
      localStorage.removeItem('translation'); 

      console.log(`LocalStorage deleted.`);
    
    } else {
    
      // Trigger a click event on the button to translate the page
      const translateButton = document.getElementById('translate');
      translateButton.click(); 
    }

  }
}

// Onclick event to translate the page

function translateToEnglish() {

  // Save the expiration time of the translation on local storage
  var now = new Date().getTime(); 
  var expiration = now + (24 * 60 * 60 * 1000); // valid 24 hours

  var putTranslation = {
    value: "true",
    expiration: expiration
  };

  localStorage.setItem('translation', JSON.stringify(putTranslation));


    const targetLanguage = 'en,es'; // Target language code 
    const contentToTranslate = document.getElementById('contentToTranslate');
  
    // Create a new translation element with the appropriate parameters
    const translationElement = document.createElement('span');
    translationElement.id = 'translationElement';

  
    // Append the translation element to the content container
    contentToTranslate.appendChild(translationElement);
  
  
    // Call the googleTranslateElementInit function to display the translation
    googleTranslateElementInit();
    

    // Function to initialize the translation element
    function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'auto', // Detects the source language automatically
        includedLanguages: targetLanguage, 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
      }, 'translationElement');
    }
}

// Onclick event to download CV
function downloadPDF() {

  // URL of the PDF file
  const pdfURL = 'Images/TatianaDubos_CV-2023.pdf';

  // Create an anchor element
  const link = document.createElement('a');
  link.href = pdfURL;
  link.target = '_blank'; // Open the PDF file in a new tab
  link.download = 'TatianaDubos_CV-2023.pdf'; // Desired file name

  // Trigger a click event on the anchor element
  link.click();
}

 

// Projects page carousel

function carousel(){
  const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});

}

// Onclick event that makes the images of the carousel larger

function largePhoto(img) {

    const element = document.querySelectorAll(".largePhoto");
    const hasClass = img.classList.contains("largePhoto");

    if(hasClass || element.length == 0){
      img.classList.toggle("largePhoto");
    }
   else  if(element.length == 1)
    {
      element[0].classList.toggle("largePhoto");
      img.classList.toggle("largePhoto");
    }
    else{ 
      return;
    }

}

// Onsubmit event on the message form

function submitForm(event) {

  event.preventDefault(); 

  const form = document.getElementById('myForm');
  const formData = new FormData(form);

// Convert the form data to URL parameters
  const params = new URLSearchParams(formData).toString();


  // Use the AWS API REST to send the email
  fetch(`https://qgose3mvv4.execute-api.us-east-1.amazonaws.com/default/portfolioForm?${params}`)
  .then(response => response.json())
  .then(data => {
      const responseContainer = document.getElementById('responseContainer');
      responseContainer.textContent = data.body.toString(); 
      
  })
  .catch(error => {
      console.error('Error:', error);
      const responseContainer = document.getElementById('responseContainer');
      responseContainer.textContent= "Erreur :  Un problème est survenu.";
  });
}



