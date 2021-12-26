import { marked } from "https://cdn.skypack.dev/marked";

let url = window.location.pathname.split("/");
let postID = url[2];
let post = document.getElementById("post");

fetch(`/api/v1/blog/getone/${postID}`)
  .then((result) => result.json())
  .then((data) => {
    let a = data.blogs;

    if (data.ownerStatus) {
      post.innerHTML = `
            <div class="card my-4 shadow-sm border-0">
                <div class="card-body">
                    <h1 class="card-title">${a.title}</h1>
                    <h6 class="card-subtitle mb-2 text-muted">By 
                      ${a.author.username}
                    </h6>
                    <div class="card-text overflow-hidden" style="color: #282829;">
                      ${marked.parse(a.body)}
                    </div>
                    <div class="d-flex justify-content-end">
                        <button id="edit-button" type="submit" class="btn btn-outline-dark mx-1"><h5>Edit</h5></button>
                        <button id="delete-button" type="submit" class="btn btn-outline-dark mx-1"><h5>Delete</h5></button>
                    </div>
                </div>
            </div>
        `;
    } else {
      post.innerHTML = `
            <div class="card my-4 shadow-sm border-0">
                <div class="card-body">
                    <h1 class="card-title">${a.title}</h1>
                    <h6 class="card-subtitle mb-2 text-muted">By 
                      ${a.author.username}
                    </h6>
                    <div class="card-text overflow-hidden" style="color: #282829;">
                      ${marked.parse(a.body)}
                    </div>
                </div>
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
