const API_KEY = "b8b88a434ed14a828e3c08d686c46383";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india, world"));

function reload() {
    window.location.reload();
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}


function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const templateNewsCard = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = templateNewsCard.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timezone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date} `;

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url, "_blank");
    })

}

let curentSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curentSelectedNav?.classList.remove('active');
    curentSelectedNav = navItem;
    curentSelectedNav.classList.add('active');
}


const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curentSelectedNav?.classList.remove('active');
    curentSelectedNav = null;
});





// ------------weather---------------

const weatherAPI_KEY = "279c709dcc75d697866cfba1a97d5f56";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(weatherURL + city + `&appid=${weatherAPI_KEY}`); 

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".iweather").style.display = "flex";
        document.querySelector(".iweather").style.margin = "-70px 0 0px 0";
    }else{
        var Weatherdata = await response.json();

        console.log(Weatherdata);
    
        document.querySelector(".city").innerHTML = Weatherdata.name;
        document.querySelector(".temp").innerHTML = Math.round(Weatherdata.main.temp)  + "°c";
        document.querySelector(".humidity").innerHTML = Weatherdata.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Weatherdata.wind.speed + " km/h";
    
        // console.log(Weatherdata);
        if (Weatherdata.weather[0].main == "Clouds") {
            weatherIcon.src = "asset/clouds.png"
        }
        else if (Weatherdata.weather[0].main == "Clear") {
            weatherIcon.src = "asset/clear.png"
        }
        else if (Weatherdata.weather[0].main == "Rain") {
            weatherIcon.src = "asset/rain.png"
        }
        else if (Weatherdata.weather[0].main == "Drizzle") {
            weatherIcon.src = "asset/drizzle.png"
        }
        else if (Weatherdata.weather[0].main == "Mist") {
            weatherIcon.src = "asset/mist.png"
        }
        else if (Weatherdata.weather[0].main == "Haze") {
            weatherIcon.src = "asset/haze.png"
        }
        else if (Weatherdata.weather[0].main == "Snow") {
            weatherIcon.src = "asset/snow.png"
        }
    
    
        document.querySelector(".weather").style.display = "flex";
        document.querySelector(".iweather").style.display = "none";
        document.querySelector(".error").style.display = "none";
    
    }

    
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
