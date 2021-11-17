let url = window.location.pathname.split("/");
let postID = url[2];
let post = document.getElementById("post");

fetch(`/api/v1/blog/getone/${postID}`)
  .then((result) => result.json())
  .then((data) => {
    let a = data.blogs;

    if (data.ownerStatus) {
      post.innerHTML = `
            <div class="box">
                <h1>${a.title}</h1>
                <h5>By ${a.author.username}</h5>
                <p>${a.body}</p>
                <div class="form-bottom-col">
                    <a href="/">Home</a>
                    <div>
                        <button id="edit-button" type="submit"><h3>Edit</h3></button>
                        <button id="delete-button" type="submit"><h3>Delete</h3></button>
                    </div>
                </div>
            </div>
        `;
    } else {
      post.innerHTML = `
            <div class="box">
                <h1>${a.title}</h1>
                <p>${a.description}</p>
                <h5>${a.author.username}</h5>
                <p>${a.body}</p>
            </div>
        `;
    }

    return data;
  })
  .then((data) => {
    if (data.ownerStatus) {
      let deleteButton = document.getElementById("delete-button");
      let editButton = document.getElementById("edit-button");

      deleteButton.addEventListener("click", () => {
        fetch(`/api/v1/blog/deleteone/${postID}`, { method: "DELETE" })
          .then((response) => response.json())
          .then((data) => (window.location.href = "/"))
          .catch((err) => console.log(err));
      });

      editButton.addEventListener("click", () => {
        window.location.href = `/updatePost/${postID}`;
      });
    }
  })
  .catch((err) => console.log(err));
