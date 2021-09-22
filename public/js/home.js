let feed = document.getElementById('feed');

fetch('/api/v1/blog/getall')
.then(result => result.json())
.then(data => {
    let views = data.blogs.map(a => {
        return `
            <div class="post-block box">
                <h3 class="post-block-title">${a.title}</h3>
                <p class="post-block-description">${a.description}</p>
                <h5 class="post-block-author">${a.author.username}</h5>
                <a href="/readPost/${a._id}">View Post>>></a>
            </div>
        `
    })
    feed.innerHTML = views.join('')
})
.catch(err => console.log(err));