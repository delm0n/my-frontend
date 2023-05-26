 window.onload = function () {
    const white_car = document.querySelector('.blockWithImg')
    const width_container = document.querySelector('.witeCar__container').clientWidth;
    let html_page = 0
    let width =0;
    myScreen()
    //вызывается при изменении размера экрана
    window.addEventListener("resize", myScreen())


    window.setTimeout(function () {
        document.querySelector('.place_for_blur').classList.remove("my_blur");
        document.querySelector('.loaderArea').classList.add("loader_stop");
    }, 2000);
   
    
   }

   
window.onbeforeunload = function () {
        window.scrollTo(0,0);
    };

function myScreen() {
    html_page = document.querySelectorAll('html')[0].offsetWidth;
    // console.log(html_page);
    
    if (html_page < 2510 && html_page > 1068) {     
        width = (html_page  - 1068) / 2 +  width_container ; 
    } 
    else {
        if (window.innerWidth > 2510) {
            width = 1237;
        }
    }
    
    white_car.style.width = width + "px"; 
}


const white_car = document.querySelector('.blockWithImg')
const width_container = document.querySelector('.witeCar__container').clientWidth;
let html_page = 0


let width =0;
//вызывается при изменении размера экрана
window.addEventListener("resize", function(event) {
html_page = document.querySelectorAll('html')[0].offsetWidth;
// console.log(html_page);

if (html_page < 2510 && html_page > 1068) {     
    width = (html_page  - 1068) / 2 +  width_container ; 
} 
else {
    if (window.innerWidth > 2510) {
        width = 1237;
    }
}

white_car.style.width = width + "px"; 
})
  
  const swiper = new Swiper('.hiddenoverflow', {
    navigation: {
        nextEl: '.str__right',
        prevEl: '.str__left',
    },

    pagination: {
      el: '.swiper-pagination',
      type: "bullets",
      clickable: true
    },

    spaceBetween: 30,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    speed:900,

    breakpoints: {
        1079: {
            slidesPerView:3,
            freeMode: false,
            simulateTouch: false,
        },

        917: {
            slidesPerView:2.6,
            freeMode: false,
            simulateTouch: false,
        }, 

        768: {
            slidesPerView:2,
            freeMode: false,
            simulateTouch: false,
        },

        500: {
            slidesPerView:1.5,
            freeMode: true,
            simulateTouch: true,
        },

        350: {
            slidesPerView:0.9,
            freeMode: true,
            simulateTouch: true,
        }
    }
});









const iconmenu = document.querySelector('.click__menu'),
menu = document.querySelector('.menu__body')
user = document.querySelector('.user_rotate_personal');

iconmenu.addEventListener('click', e => {
    if (!menu.classList.contains('menu__body_active')) {
        menu.classList.add('menu__body_active');
        iconmenu.classList.add('openmenu');
        document.body.classList.add('body_hidd');
        setTimeout(function() {user.classList.add('rotateMyUser')},600)
        
    }
    else {
        menu.classList.remove('menu__body_active');
        iconmenu.classList.remove('openmenu');
        document.body.classList.remove('body_hidd');
        user.classList.remove('rotateMyUser')
    }
})


const content_page_all = document.querySelectorAll('.content_page');
const title_block = document.querySelectorAll('.title_block')


function ChangeActiveTitle(el) {
    for (let i = 0; i < title_block.length; i++) {
        title_block[i].classList.remove('title_block_active');
    }
    title_block[el].classList.add('title_block_active');
}


let currTab = 0
//узнаём с помощью target элемент, по которому кликнули
for (let i = 0; i<title_block.length; i++) {
    title_block[i].addEventListener('click', e => {
        if (e.target.dataset.title === "1" || e.target.dataset.title === "2" ) 
            {
                currTab = e.target.dataset.title - 1;
                // console.log(currTab)
                ChangeActiveTitle(currTab)
            }

            for (let i =0; i < content_page_all.length; i++) 
            {
                content_page_all[i].classList.remove('active_page');
                if (content_page_all[i].dataset.page == (currTab+1)) 
                    {
                        content_page_all[i].classList.add('active_page');
                        
                    }
            }
                if ((currTab+1) == 2) {
                    swiper2.update();
                    swiper2.autoplay.stop();
                    swiper2.autoplay.start();
                }
                else {
                    swiper2.autoplay.stop();
                }
            

    })
}

const swiper2 = new Swiper('.hiden__page2', {

    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    loop: true,
    // spaceBetween: 50,
    // autoplayDisableOnInteraction: false,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    // slidesPerView:2,
    slidesPerGroup:1, 
    speed:1000, 
    breakpoints: {
        1050: {
            slidesPerView:2,
            spaceBetween: 50,
        },

        1024: {
            slidesPerView:2,
            spaceBetween: 10,
        },

        500: {
            slidesPerView:1,
            spaceBetween: 10,
        }
    }
});















const formTabs = document.querySelectorAll('.formTabs')
const formTabs_container = document.querySelector('.formTabs__container')
const formPages = document.querySelectorAll('.formPage__kawaii')


function ChangeActiveForm(el) {
    for (let i = 0; i < formTabs.length; i++) 
         { formTabs[i].classList.remove('formTabs__active'); }
    el.classList.add('formTabs__active');
}

let formTab = 0
//узнаём с помощью target элемент, по которому кликнули
formTabs_container.addEventListener('click', e => {
    if (e.target.dataset.idea === "login" || e.target.dataset.idea === "enter" ) 
    {
        formTab = e.target.dataset.idea;
        
        ChangeActiveForm(e.target)
    }

    for (let i =0; i < formPages.length; i++) 
        {
            formPages[i].classList.remove('formPage__active');
            if (formPages[i].dataset.page === formTab) 
                {
                    formPages[i].classList.add('formPage__active');
                }
        }

})



//========================================CATALOG
const show__more = document.querySelector('.show__more'),
 icon_search = document.querySelector('.imgSearch'),
 icon_close = document.querySelector('.close'),
 cards_array = document.querySelectorAll('.card_block_catalog'),
 inputZero = document.querySelector('.IputZero'),
 before_click = document.querySelectorAll('.active__before__click__btn'),
 after_click = document.querySelectorAll('.active__after__click__btn');

 let was_search = false;
let input_value = "";
let check_morebtn = false;
let iusefilter = false, iusesearch = false;

const subclass = document.querySelectorAll('.subclass');
let subclassCURR = 0;
document.querySelector('.subclass__absolute').addEventListener('click', e => {
addTrans();
addClass();

})

for (let i = 0; i<subclass.length; i++) {
    subclass[i].addEventListener('click', e => {
        iusefilter = true;
        close_f()
        console.log(iusefilter);
        if (e.target.dataset.subletter === "b" || e.target.dataset.subletter === "c" || e.target.dataset.subletter === "d" || e.target.dataset.subletter === "j") 
            {
                subclassCURR = e.target.dataset.subletter;
                // console.log(subclassCURR);
                // checkfuckingbtn()
                reText_filter(subclassCURR, subclass, '.subclass_block');
                filterLetter();
            }
        else {
            if (e.target.dataset.all === "all") {
                // console.log("all");
                shower();
                addLetter();
            }
        }    
    })
}







const subtrans = document.querySelectorAll('.subtrans');
let subtransCURR = 0;
document.querySelector('.subtranss__absolute').addEventListener('click', e => {
addLetter();
addClass();
})
for (let i = 0; i<subtrans.length; i++) {
    
    subtrans[i].addEventListener('click', e => {
    iusefilter = true;
    close_f()
    console.log(iusefilter);
        if (e.target.dataset.subtransmission === "auto" || e.target.dataset.subtransmission === "mechanic" ) 
            {
                subtransCURR = e.target.dataset.subtransmission;
                // checkfuckingbtn();
                reText_filter(subtransCURR, subtrans, '.subtrans_block');
                filterTrans();
            }
        else {
            if (e.target.dataset.all === "all") {
                // console.log("all");
                shower();
                addTrans();
            }
        }    

    })
}


const substyle = document.querySelectorAll('.substyle');
let substyleCURR = 0;
document.querySelector('.substyle__absolute').addEventListener('click', e => {
addLetter();
addTrans();
})

for (let i = 0; i<substyle.length; i++) {
    
    substyle[i].addEventListener('click', e => {   
        iusefilter = true; 
        close_f()
        console.log(iusefilter);
        if (e.target.dataset.subclass === "suv" || e.target.dataset.subclass === "minivan" || e.target.dataset.subclass === "pic" || e.target.dataset.subclass === "sed" || e.target.dataset.subclass === "univ") 
            {
                substyleCURR = e.target.dataset.subclass;
                // checkfuckingbtn();
                reText_filter(substyleCURR, substyle, '.substyle_block');
                filterClass();
            }
        else {
            if (e.target.dataset.all === "all") {
                // console.log("all");
                shower();
                addClass();
            }
        }    

    })
}


function reText_filter(el, array, nameclass) {
    for (let i = 0; i<array.length; i++) {
        if (array[i].dataset.subletter == el) {
            document.querySelector(nameclass).textContent = array[i].textContent;
        }
        else {
            if (array[i].dataset.subtransmission == el) {
                document.querySelector(nameclass).textContent = array[i].textContent;
            }
            else {
                if (array[i].dataset.subclass == el) {
                    document.querySelector(nameclass).textContent = array[i].textContent;
                }
            }
        }
    }
}
 


show__more.addEventListener('click', () => {
    check_morebtn = true;
    show__more.textContent = "Перейти в каталог"
    hello(); 

    checkfuckingbtn()
    
})

function checkfuckingbtn() {

    if (iusefilter == true ) {
        for (let i = 0; i<after_click.length; i++) {
            if (after_click[i].dataset.letter == subclassCURR) {
                after_click[i].style.display = "block";
                after_click[i].classList.add('hideAllInputZero__3');
                console.log(2);
            }
            else {
                if (after_click[i].dataset.transmission === subtransCURR) {
                 after_click[i].style.display = "block";
                 after_click[i].classList.add('hideAllInputZero__3');
                }
                    else {
                        if (after_click[i].dataset.class === substyleCURR) {
                    after_click[i].style.display = "block";
                    after_click[i].classList.add('hideAllInputZero__3');
                        }
                    }   
                } 
            }
    }

    else {
        if (iusesearch == true) {
            for (let i = 0; i<after_click.length; i++) 
            {
                if (after_click[i].dataset.marks == input_value) {
                    after_click[i].style.display = "block";
                    after_click[i].classList.add('hideAllInputZero__3');
                }
            }
            
        }

        else {
                if (iusefilter == false && iusesearch == false) {
                    for (let i = 0; i<after_click.length; i++) {
                        after_click[i].style.display = "block";
                        after_click[i].classList.add('hideAllInputZero__3');
                    }
                }
        }
    }
}



function hello(){
   if ( show__more.textContent == "Перейти в каталог" ) {
    show__more.setAttribute("onclick", "window.open('hello.html')");
   }
}

function timeEnterMark() {
    document.querySelector('.search_form').placeholder = "Введите марку машины";
}

function vocabulary() {

    if (input_value == "") {
        document.querySelector('.search_form').placeholder = "Вы ничего не ввели!";
        setTimeout(timeEnterMark, 2000);
    }
     
    else {
        if (input_value == "лада" || input_value == "lada") 
        {input_value = "lada";}
        else {
            if (input_value == "бмв" || input_value == "bmw") 
            {input_value = "bmw";}
            else {
                if (input_value == "фиат" || input_value == "fiat") 
                {input_value = "fiat";}
                else {
                    if (input_value == "фольксваген" || input_value == "volkswagen") 
                    {input_value = "volk";}
                    else {
                        if (input_value == "мильтсубиси" || input_value == "mitsubishi" || input_value == "митсубиси") 
                        {input_value = "mitsub";}
                        else {
                                icon_search.classList.add('hideCard');
                                icon_close.classList.add('show__close');
                                inputZero.classList.add('IputZero_show');
                                inputZero.classList.add('hideAllInputZero__3');
                                hider();
                            }
                        }
                    }
                }
            }
        }
}    

function doSearch() {
    for (let i = 0; i<before_click.length; i++) 
    {
        if (before_click[i].dataset.marks == input_value) {
            
            before_click[i].classList.remove('hideAllInputZero__1');
            before_click[i].style.display = "block";
            before_click[i].classList.add('hideAllInputZero__3');
        }
    }
}

function checker_morebtn() {
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].style.display = "none";
        cards_array[i].classList.remove('hideAllInputZero__3');
    }



    doSearch();
    if (check_morebtn == true) {
        for (let i = 0; i<after_click.length; i++) 
        {
            if (after_click[i].dataset.marks == input_value) {
                after_click[i].style.display = "block";
                after_click[i].classList.add('hideAllInputZero__3');
            }
        }
    }

}

function filterLetter() {
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].style.display = "none";
        cards_array[i].classList.remove('hideAllInputZero__3');
    }

   for (let i = 0; i<before_click.length; i++) 
    {
        if (before_click[i].dataset.letter == subclassCURR) {
            before_click[i].classList.remove('hideAllInputZero__1');
            before_click[i].style.display = "block";
            before_click[i].classList.add('hideAllInputZero__3');
        }

    }

    if (check_morebtn == true) {
        for (let i = 0; i<after_click.length; i++) 
        {
            if (after_click[i].dataset.letter == subclassCURR) {
                after_click[i].style.display = "block";
                after_click[i].classList.add('hideAllInputZero__3');
            }
        }
    } 
}

function filterTrans() {
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].style.display = "none";
        cards_array[i].classList.remove('hideAllInputZero__3');
    }

    for (let i = 0; i<before_click.length; i++) 
     {
         if (before_click[i].dataset.transmission === subtransCURR) {
             before_click[i].classList.remove('hideAllInputZero__1');
             before_click[i].style.display = "block";
             before_click[i].classList.add('hideAllInputZero__3');
         }
 
     }
 
     if (check_morebtn == true) {
         for (let i = 0; i<after_click.length; i++) 
         {
             if (after_click[i].dataset.transmission === subtransCURR) {
                 after_click[i].style.display = "block";
                 after_click[i].classList.add('hideAllInputZero__3');
             }
         }
     } 
 }

 function filterClass() {
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].style.display = "none";
        cards_array[i].classList.remove('hideAllInputZero__3');
    }

    for (let i = 0; i<before_click.length; i++) 
     {
         if (before_click[i].dataset.class === substyleCURR) {
             before_click[i].classList.remove('hideAllInputZero__1');
             before_click[i].style.display = "block";
             before_click[i].classList.add('hideAllInputZero__3');
         }
 
     }
 
     if (check_morebtn == true) {
         for (let i = 0; i<after_click.length; i++) 
         {
             if (after_click[i].dataset.class === substyleCURR) {
                 after_click[i].style.display = "block";
                 after_click[i].classList.add('hideAllInputZero__3');
             }
         }
     } 
 }

function addLetter() {
  document.querySelector('.subclass_block').textContent = "Класс автомобиля";
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].classList.remove('hideAllInputZero__1');
        cards_array[i].classList.add('hideAllInputZero__3');
    }    
}

function addTrans() {
    document.querySelector('.subtrans_block').textContent = "Коробка передач";
      for (let i = 0; i<cards_array.length; i++) {
          cards_array[i].classList.remove('hideAllInputZero__1');
          cards_array[i].classList.add('hideAllInputZero__3');
      }    
}

function addClass() {
    document.querySelector('.substyle_block').textContent = "Тип кузова";
      for (let i = 0; i<cards_array.length; i++) {
          cards_array[i].classList.remove('hideAllInputZero__1');
          cards_array[i].classList.add('hideAllInputZero__3');
      }    
  }


function hider() {
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].classList.remove('hideAllInputZero__3');
    }  

    if (check_morebtn == false) {
        for (let i = 0; i<before_click.length; i++) {
        before_click[i].classList.add('hideAllInputZero__1');
        setTimeout( function() { before_click[i].style.display = "none"},400);
        }
    }
    else {
        for (let i = 0; i<before_click.length; i++) {
            before_click[i].classList.add('hideAllInputZero__1');
            setTimeout( function() { before_click[i].style.display = "none"},400);
            }

        for (let i = 0; i<after_click.length; i++) {
        after_click[i].classList.add('hideAllInputZero__1');
        setTimeout( function() { after_click[i].style.display = "none"},400);
        }
    }   
}

function shower() {
    if (check_morebtn == false) {
        for (let i = 0; i<before_click.length; i++) {
        
        before_click[i].style.display = "block";
        before_click[i].classList.add('hideAllInputZero__3');
        }
    }
    else {
        for (let i = 0; i<before_click.length; i++) {
            before_click[i].style.display = "block";
            before_click[i].classList.add('hideAllInputZero__3');
            after_click[i].style.display = "block";
            after_click[i].classList.add('hideAllInputZero__3');
        }
    }


}




function search() {
    addLetter();
    addTrans();
    addClass();
    iusesearch =true

input_value = document.querySelector('.search_form').value.toLowerCase().replace(/\s/g, '');
vocabulary();
checker_morebtn();

    if (input_value != "") { 
        icon_search.classList.add('hideCard');
        icon_close.classList.add('show__close');
    }
}

function enterClick() {
    search();
    if (input_value == "") {
        for (let i = 0; i<cards_array.length; i++) {
            cards_array[i].style.display = "block";
        }
    }
}

function close_f() {
    icon_search.classList.remove('hideCard');
    icon_close.classList.remove('show__close');
    document.querySelector('.search_form').value = "";
    inputZero.classList.remove('IputZero_show'); 
    shower();
    document.querySelector('.subclass_block').textContent = "Класс автомобиля";
    for (let i = 0; i<cards_array.length; i++) {
        cards_array[i].classList.remove('hideAllInputZero__1');
        cards_array[i].classList.add('hideAllInputZero__3');
    }   
}



icon_search.addEventListener('click', () => {
    search();
    if (input_value == "") {
        for (let i = 0; i<cards_array.length; i++) {
            cards_array[i].style.display = "block";
        }
    }
})

icon_close.addEventListener('click', () => {   
   close_f() 
})

document.querySelector('.search_form').onkeypress = function (el) {
    if (el.charCode == "13") {
        enterClick() 
    }
}


function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }
  
  let options = { threshold: [0.2] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation-bottom');
  for (let elm of elements) {
    observer.observe(elm);
  }



document.querySelector('.btn__upHead').addEventListener('click', e => {
    document.querySelector('.ivent').click();
})

