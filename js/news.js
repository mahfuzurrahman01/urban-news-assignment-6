
const url = 'https://openapi.programming-hero.com/api/news/categories'
fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCatagories(data.data.news_category))
    .catch(error => console.log(error))

const displayNewsCatagories = catagories => {
    const parentField = document.getElementById('news-catagories-field');
    catagories.forEach(catagory => {
        console.log(catagory)
        const catagoriesField = document.createElement('div');
        // catagoriesField.classList.add('btn,btn-outline-danger');
        catagoriesField.innerHTML = `
        <button class = "btn btn-outline-dark" onclick="catagoriesClick()"> ${catagory.category_name}</button>
        `
        parentField.appendChild(catagoriesField);
    })

}