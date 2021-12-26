import { marked } from "https://cdn.skypack.dev/marked";

let url = window.location.pathname.split("/");
let postID = url[2];
let title = document.getElementById("title");
let description = document.getElementById("description");
let body = document.getElementById("write-area");
let blogForm = document.getElementById("blog-form");
let preview = document.getElementById("preview");

body.addEventListener("input", () => {
  preview.innerHTML = marked.parse(body.value);
});

fetch(`/api/v1/blog/getone/${postID}`)
  .then((result) => result.json())
  .then((data) => {
    let blog = data.blogs;
    title.value = blog.title;
    description.value = blog.description;
    body.value = blog.body;
  });

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: title.value,
    description: description.value,
    body: body.value,
  };

  post(data);
});

const post = async (data) => {
  await fetch(`/api/v1/blog/updateone/${postID}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `/readPost/${data._id}`;
    });
};
