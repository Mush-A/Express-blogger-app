let blogForm = document.getElementById("blog-form");

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
      setTimeout(
        () => (window.location.href = `/readPost/${data.newPost._id}`),
        1000
      );
    });
};
