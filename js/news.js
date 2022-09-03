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
    // no data found massage condition 
    const noDataField = document.getElementById('no-data-section');
    if (articles.length === 0) {
        noDataField.classList.remove('d-none')
    }
    else {
        noDataField.classList.add('d-none')
    }
    //number of article count 
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
        newsChildDiv.classList.add('card', 'mb-3', 'p-3')
        newsChildDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${article.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.details.slice(0, 300)}...</p>
                <div class="card-text d-flex justify-content-between text-secondary">
                    <div class='d-flex align-items-center gap-1'>
                        <img src='${article.author.img}' class='author-img'>
                        <div>
                            <p class="m-0 small">${article.author.name ? article.author.name : 'Authors not found'}</p>
                            <p class="m-0 small">${article.author.published_date}</p>
                        </div>
                    </div>
                    <!-- ------------------2---------------- -->
                    <div class='d-flex align-items-center gap-1'>
                        <i class="fa-regular fa-eye"></i>
                        <div>
                            <small>${article.total_view} views</small>
                        </div>
                    </div>
                    <!-- -----------------------3------------------ -->
                    <div class='d-flex align-items-center'>
                        <div>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>
                    <!-- --------------------4----------------------------- -->
                    <div>
                        <button class="btn btn-danger">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        newsParentDiv.appendChild(newsChildDiv);
    })
}

