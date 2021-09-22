let feed = document.getElementById('feed');

fetch('/api/v1/blog/getall')
.then(result => result.json())
.then(data => {
    let views = data.blogs.map(a => {
        return `
            <div class="post-block box">
                <div>
                    <h2 class="post-block-title">${a.title}</h2>
                    <h5 class="post-block-author">By ${a.author.username}</h5>
                </div>
                <p class="post-block-description">${a.description}</p>
                <a href="/readPost/${a._id}"><button id="edit-button" type="submit"><h3>View post</h3></button></a>
            </div>
        `
    })
    feed.innerHTML = views.join('')
})
.catch(err => console.log(err));