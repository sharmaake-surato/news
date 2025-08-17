const apiKey = 'API+KEY+HERE'; // Replace with your actual API key
const blogCon = document.getElementById('blog-container');
const searchBox = document.getElementById('.search-input');
const searchBtn = document.getElementById('.search-button');

// Fetching random news articles
async function fetchRandomNews() {
    apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    try {   
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles || []
    }catch(error){
        console.error('Error fetching random news:', error);
        return [];
    }
}

// Displaying news articles
function showNews(articles){
 blogCon.innerHTML = '';
    articles.forEach(article => {
        blogCon.innerHTML += `
        <div class="blog-card">
            <img src="${article.urlToImage}" alt="Blog Image">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        </div>
        `
    });
} 

// Loaded page on news
(async () => {
    try{
        const articles = await fetchRandomNews();
        console.log(articles);
        showNews(articles);
    }catch(error){
        console.error('Error loading news:', error);
    }
})();

// getting the news by querry
async function getNewsByQuery(query) {
    apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;

    try {   
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles || []
    }catch(error){
        console.error('Error Getting news by Query:', error);
        return [];
    }
}

// add Event Listener
searchBtn.addEventListener('click', async () => {
    const query = searchBox.value.trim();
    if (query != '') {
        try {
            const articles = await getNewsByQuery(query);
            showNews(articles);
        }catch(error) {
            console.error('Error Fetching news by Query:', error);
        }
    }
})
