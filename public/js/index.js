const authorizedNavbar = () => {
  let navbar = `
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid d-flex">
            <a class="navbar-brand justify-content-start" href="#">
                <img src="/img/logo.png" alt="logo" class="logo-s">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/writepost">Write</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Menu
                        </a>
                        <ul class="border-0 rounded-0 shadow-sm dropdown-menu dropdown-menu-right" style="right: -12px; left: auto; top: 55px" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="/profile">Profile</a></li>
                            <li><a class="dropdown-item" href="/api/v1/auth/logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;

  document.getElementById("navbar-wrapper").innerHTML = navbar;
};

const unauthorizedNavbar = () => {
  let navbar = `
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid d-flex">
            <a class="navbar-brand justify-content-start" href="#">
                <img src="/img/logo.png" alt="logo" class="logo-s">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;

  document.getElementById("navbar-wrapper").innerHTML = navbar;
};

const loadNavbar = async () => {
  unauthorizedNavbar();

  await fetch("/api/v1/auth/isLoggedIn")
    .then((res) => res.json())
    .then((data) => {
      if (data.isLoggedIn) {
        authorizedNavbar();
      } else {
        unauthorizedNavbar();
      }
    });
};

loadNavbar();
