import { marked } from "https://cdn.skypack.dev/marked";

let blogForm = document.getElementById("blog-form");

let body = document.getElementById("write-area");
let preview = document.getElementById("preview");

body.addEventListener("input", () => {
  preview.innerHTML = marked.parse(body.value);
});

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let body = document.getElementById("write-area");

  const data = {
    title: title.value,
    description: description.value,
    body: body.value,
  };

  post(data);
});

const post = async (data) => {
  await fetch(`/api/v1/blog/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `/readPost/${data.newPost._id}`;
    });
};
