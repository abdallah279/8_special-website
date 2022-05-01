// local storge
let mainColor = localStorage.getItem('color-option');

if(mainColor !== null){

    // storage the color-option(data-color) in --main-color
    document.documentElement.style.setProperty('--main-color' , mainColor);

    // remove class active from li color in localstorage
    document.querySelectorAll('.color li').forEach(element =>{

        element.classList.remove('active');

        // check if data-color with element === maincolor
        if(element.dataset.color === mainColor){

            // add class active from element(data-color element = maincolor)
            element.classList.add('active');
        }
    });
}

// Random Background Option
let backgroundOption = true;

// variable to control the Interval
let backgroundInterval;

let backgroundItem = localStorage.getItem('background-option');

if(backgroundItem !== null){

    if(backgroundItem === 'true'){

        backgroundOption = true;

    }else{

        backgroundOption = false;

    }

    document.querySelectorAll('.random-background span').forEach(element =>{

        element.classList.remove('active');

    });

    if(backgroundItem === 'true'){
        document.querySelector('.random-background .yes').classList.add('active');
    }else{
        document.querySelector('.random-background .no').classList.add('active');
    }

}

// get setting-box
let settingBox = document.querySelector('.setting-box');

// get setting-icon
let settingIcon = document.querySelector('.fa-cog');

settingIcon.onclick = function(){

    // toggle class spin
    this.classList.toggle('fa-spin');

    // toggle class open in setting-box
    settingBox.classList.toggle('open');
}

const colorLi = document.querySelectorAll('.color li');

colorLi.forEach(li =>{
    li.addEventListener('click' , (e)=>{
        document.documentElement.style.setProperty('--main-color' ,e.target.dataset.color);
        localStorage.setItem('color-option' , e.target.dataset.color);

        controllActiveClass(e);
    });
});

// setting with random background
let randomBackEl = document.querySelectorAll('.random-background span');

randomBackEl.forEach(span =>{
    span.addEventListener('click' , (e) =>{

        controllActiveClass(e);

        if(e.target.dataset.background === "yes"){

            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem('background-option' , true);

        }else{

            backgroundOption = false;
            clearInterval(backgroundInterval);

            localStorage.setItem('background-option' , false);

        }
    });
});

let navgation = document.querySelector('.navgation');

let bulletsItem = localStorage.getItem('bullets-option');

if(bulletsItem !== null){

    document.querySelectorAll('.Bullets-option span').forEach(span=>{

        span.classList.remove('active');

    });
    if(bulletsItem === 'true'){
        navgation.style.display = 'block';
        document.querySelector('.Bullets-option .yes').classList.add('active');
    }else{
        navgation.style.display = 'none';
        document.querySelector('.Bullets-option .no').classList.add('active');
    }


}

let bulletsOption = document.querySelectorAll('.Bullets-option span');

bulletsOption.forEach(bull =>{

    bull.addEventListener('click' , (e)=>{

        controllActiveClass(e);

        if(e.target.dataset.display === 'yes'){

            navgation.style.display = 'block';
            localStorage.setItem('bullets-option' , true);

        }else{

            navgation.style.display = 'none';
            localStorage.setItem('bullets-option' , false);

        }
    });

});

// set landing-page
let landingPage = document.querySelector('.landing-page');

// get background-images in array
let landingImage = ['url("image/01.jpg")',
'url("image/02.jpg")',
'url("image/03.jpg")',
'url("image/04.png")',
'url("image/06.jpg")'];

function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * landingImage.length);
            landingPage.style.backgroundImage = landingImage[randomIndex];
        }, 3000);
    }
}

randomizeImgs();

// set skills section
let ourSkills = document.querySelector('.skills');

window.onscroll = function(){

    // skills offsetTop
    let skillsOffSetTop = ourSkills.offsetTop;

    // skills Outter Height
    let skillsOffSetHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window Scroll Top
    let windowScroll = this.pageYOffset;


    if(windowScroll > (skillsOffSetTop + skillsOffSetHeight - windowHeight)){

        let allSpan = document.querySelectorAll('.skill-box .skill-prograss span');

        allSpan.forEach(skill => {
            skill.style.width = skill.dataset.width;
        });

    };
};

// set gallary box
let gallayImg = document.querySelectorAll('.our-gallary .gallary-img img');

// Loop For All Image
gallayImg.forEach(img =>{

    img.addEventListener('click' , ()=>{

        // Create Overlay Element
        let popupOverlay = document.createElement('div');

        // Add Class To Overlay
        popupOverlay.className = 'popup-overlay';

        // Append Overlay Elemenet In Body
        document.body.appendChild(popupOverlay);

        // Create Popup-Box
        let popupBox = document.createElement('div');

        // Add Class To PopupBox
        popupBox.className = 'popup-box';

        if(img.alt !== null){

            // Create Heading
            let popupHeader = document.createElement('h3');

            // Create Text For Heading
            let popupHeaderText = document.createTextNode(img.alt);

            // Append HeadingText To PopupHeading
            popupHeader.appendChild(popupHeaderText);

            // Append PopupHHeading To PopupBox
            popupBox.appendChild(popupHeader);

        }

        // Create Img
        let popupImg = document.createElement('img');

        // Set Image Source
        popupImg.src = img.src;

        // Add Image To PopupBox
        popupBox.appendChild(popupImg);

        // Append The PopupBox In Body
        document.body.appendChild(popupBox);

        let closeButton = document.createElement('span');

        closeButton.className = 'close-button';

        let closeButtonText = document.createTextNode('X');

        closeButton.appendChild(closeButtonText);

        popupBox.appendChild(closeButton);

    });

});

document.addEventListener('click' , (e)=>{

    if(e.target.classList == 'close-button'){

        document.querySelector('.popup-box').remove();

        document.querySelector('.popup-overlay').remove();

    }
});


// Select all bullets
let bullets = document.querySelectorAll('.navgation .bullet');

// Select all links
let links = document.querySelectorAll('.links a');

// Scrolling Function
function scrolling(elements){
    elements.forEach(ele =>{

        ele.addEventListener('click',(e)=>{
    
            e.preventDefault();
    
            document.querySelector('.' + e.target.dataset.section).scrollIntoView({
    
                behavior : 'smooth'
    
            });
    
        });
    
    });
}

scrolling(bullets);
scrolling(links);

// Class active function
function controllActiveClass(ev){

    // loop in all element with class active => to remove active class from all li
    ev.target.parentElement.querySelectorAll('.active').forEach(element =>{
        element.classList.remove('active');
    });

    // add class active to e.target
    ev.target.classList.add('active');
}

const resetBtn = document.querySelector('.option-box .btn');

resetBtn.addEventListener('click' , ()=>{

    localStorage.clear();

    window.location.reload();

});

let menuBtn = document.querySelector('.toggale-menu');
let menuLinks = document.querySelector('.landing-header .links');

menuBtn.onclick = function(e){

    e.stopPropagation();
    // toggle Class 'Menu-active' on Buuton
    this.classList.toggle('menu-active');

    // toggle Class 'Open' on links
    menuLinks.classList.toggle('open');

}

menuLinks.onclick = (e)=>{

    e.stopPropagation();

}

document.addEventListener('click' , (e)=>{

    if(e.target !== menuBtn && e.target !== menuLinks){

        if(menuLinks.classList.contains('open')){

            // toggle Class 'Menu-active' on Buuton
            menuBtn.classList.toggle('menu-active');

            // toggle Class 'Open' on links
            menuLinks.classList.toggle('open');

        }

    }
});



























