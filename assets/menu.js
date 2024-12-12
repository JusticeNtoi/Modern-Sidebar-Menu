document.addEventListener("DOMContentLoaded", () => {
  let toggle = document.querySelector(".logo");
  let sideMenu = document.querySelector("aside");
  let mode = document.querySelector(".mode");
  let modeIcon = document.querySelector(".mode i").classList;
  let menu = document.querySelector("ul.main");
  let menuList = document.querySelectorAll("ul.main li");

  // Navigation
  const contentContainer = document.querySelector("#content");

  // Sidebar toggle
  toggle.addEventListener("click", (evt) => {
    sideMenu.classList.toggle("expand");
  });

  // Menu item selection
  menuList.forEach((e, index) => {
    e.addEventListener("click", (evt) => {
      menuList.forEach((el) => {
        el.classList.remove("active");
      });
      menu.style.setProperty("--i", index);
      e.classList.add("active");

      // Get the label text and load the corresponding page
      const page = e.querySelector("label").textContent.toLowerCase();
      loadPage(page);
    });
  });

  // Dark mode toggle
  mode.addEventListener("click", (evt) => {
    document.body.classList.toggle("dark");

    if (modeIcon.contains("fa-moon")) {
      modeIcon.replace("fa-moon", "fa-sun");
    } else {
      modeIcon.replace("fa-sun", "fa-moon");
    }
  });

  // Load page content dynamically
  const loadPage = (page) => {
    fetch(`./pages/${page}.html`)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((html) => {
        contentContainer.innerHTML = html;
      })
      .catch((error) => {
        contentContainer.innerHTML = `<h2>Error: ${error.message}</h2>`;
      });
  };

  // Load default page
  loadPage("home");
});
