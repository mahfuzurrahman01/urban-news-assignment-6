//----------first take all the categories -------------//
const url = 'https://openapi.programming-hero.com/api/news/categories'
fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCatagories(data.data.news_category))
    .catch(error => console.log(error))
//---------------daynamically add the catagories name------------//
const displayNewsCatagories = catagories => {
    const parentField = document.getElementById('news-catagories-field');
    catagories.forEach(category => {
        // console.log(category)
        const catagoriesField = document.createElement('div');
        catagoriesField.innerHTML = `
        <button class = "btn btn-outline-dark mx-auto" onclick="catagoriesClick(${category.category_id},'${category.category_name}')"> ${category.category_name}</button>
        `
        parentField.appendChild(catagoriesField);

    })

}
// --------------spinner--------------/
const toggleSpinner = isLoading => {
    const spinnerField = document.getElementById('spinner');
    if (isLoading === true) {
        spinnerField.classList.remove('d-none')
    }
    else {
        spinnerField.classList.add('d-none')
    }
};


// ----------------catagories onclick funtion two dynamic parameter--------------//
const catagoriesClick = (id, name) => {
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, name))
        .catch(error => console.log(error));

}
const displayNews = (articles, name) => {
    toggleSpinner(false)
    const sortField = document.getElementById('sort-section')
    const countField = document.getElementById('count-field');
    countField.innerHTML = `
    <h5 class="fw-normal border bg-white px-4 py-2 my-4">${articles.length} items found for category <span class="text-danger">${name}</span></h5>
    `
    sortField.classList.remove('d-none')
    const newsParentDiv = document.getElementById('news-field');
    newsParentDiv.innerHTML = '';

    articles.forEach(article => {
        console.log(article)
        const newsChildDiv = document.createElement('div');
        newsChildDiv.classList.add('card','mb-3','p-3')
        newsChildDiv.innerHTML = `
       
        <div class="row g-3 align-items-center">
            <div class="col-md-4">
                <img src="${article.image_url}" class="img-fluid rounded-start rounded-end-0" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    
        `
        newsParentDiv.appendChild(newsChildDiv);
    })
}

