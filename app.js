///// url https://api.weatherapi.com/v1/current.json?key=4d1a4b570a2a419fae454537240307 &q=London&aqi=no


// it shouldn't not used for the building web site bcouse API key is a secrate key 
let key = `4d1a4b570a2a419fae454537240307`;


const infoCon = document.querySelector('.weather-info-con');
const city = document.getElementById('name');
const country = document.getElementById('country');
const date = document.getElementById('date');
const day_condition = document.getElementById('day-condition');

// for data load 

async function dataLoad(text){
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${text}&aqi=no`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    if(!data.error){
        showData(data);
    }else{
        infoCon.innerHTML = `
        <h3 id="error" class="ero">search by right country name.</h3>
        `;
        gsap.from('#error ',{
            opacity: 0, 
            duration: 1,
            scale: 0, 
            ease: "back.out(2.9)", 
            // stagger: .2,
        })
    }
    } catch (error) {
        console.log(error, 'something is problem making fetch time');
        infoCon.innerHTML = `
        <h3 id="error">search by right country name.</h3>
        `;
        gsap.from('#error ',{
            opacity: 0, 
            duration: 1,
            scale: 0, 
            ease: "back.out(2.9)", 
            // stagger: .2,
        })
        
    }

}


function showData (data){
    infoCon.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('info');
    div.innerHTML = `
                    <img class="condition-Img"  alt="">
                    <h1 class="item" id="name">${data.location.name}</h1>
                    <h4 class="item" id="country">${data.location.country}</</h4>
                    <h1 class="item"><span id="temp">${data.current.temp_c}</</span><sup>°C</sup></h1>
                    <p class="item">date: <span id="date">${data.location.localtime}</</span></p>
                    <p class="item" id="day-condition">${data.current.condition.text}</</p>
                    `;
    infoCon.appendChild(div);
    // animation 
    gsap.from('.item ',{
        opacity: 0, 
        duration: 1,
        scale: 0, 
        ease: "back.out(2.9)", 
        stagger: .2,
    })

    conditionImgSet(data.current.condition.text);
    console.log('hello');
    console.log(document.querySelector('.condition-Img'));
    gsap.from('.condition-Img',{
        y: -50,
        opacity: 0, 
        duration: 1,
        // scale: 0, 
        ease: "back.out(2.9)", 
        
    })
}


function conditionImgSet(text){
    console.log(text);
    let main = text.toLowerCase();
    console.log(main.includes('rain'));
    if(main.includes('rain')){
        setImg('./img/rain.png')
    }
    else if(main.includes('sunny')){

        setImg('./img/suny.png')
    }
    else if(main.includes('partly')){
        setImg('./img/prity.png')
    }
    else{
        setImg('./img/normal.png')
    }  
}

function setImg(url){
    let img = document.querySelector('.condition-Img');
    img.setAttribute('src', `${url}`);
}






document.querySelector('.search-btn').addEventListener('click', function(){
    if(document.querySelector('.field').value !== ''){
        dataLoad(document.querySelector('.field').value)
    }
    // document.querySelector('.field').value
})
document.querySelector('.field').addEventListener('keyup', function(e){
    console.log(e.keyCode);
    if(e.target.value !== ''){
        if(e.keyCode === 13 ){
            dataLoad(e.target.value);
        }
    }
    // document.querySelector('.field').value
})

// dataLoad('bangladesh');