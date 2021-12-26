let feed = document.getElementById("feed");

fetch("/api/v1/blog/getall")
  .then((result) => result.json())
  .then((data) => {
    let views = data.blogs.map((a) => {
      console.log(a);
      return `
            <div class="card my-4 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title">${a.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">By ${a.author.username}</h6>
                    <p class="card-text text-truncate-4" style="color: #282829;">${a.description}</p>
                    <div class="d-flex justify-content-end">
                        <a href="/readPost/${a._id}"><button class="btn btn-outline-dark"><h5>Read</h5></button></a>
                    </div>
                </div>
            </div>
        `;
    });
    feed.innerHTML = views.join("");
  })
  .catch((err) => console.log(err));
