
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}



const articleSearch = document.querySelector("#article-search");
const articleCards = document.querySelectorAll(".library-card");
const filterButtons = document.querySelectorAll(".filter-button");
const resultsCount = document.querySelector("#results-count");
const emptyResults = document.querySelector("#empty-results");

if (articleSearch && articleCards.length) {
  let activeCategory = "all";

  function filterArticles() {
    const query = articleSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    articleCards.forEach((card) => {
      const category = card.dataset.category;
      const searchableText = [
        card.dataset.search,
        card.querySelector("h3")?.textContent,
        card.querySelector("p")?.textContent
      ].join(" ").toLowerCase();

      const matchesCategory =
        activeCategory === "all" || category === activeCategory;

      const matchesSearch = searchableText.includes(query);
      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;

      if (isVisible) visibleCount++;
    });

    resultsCount.textContent =
      `${visibleCount} ${visibleCount === 1 ? "article" : "articles"}`;

    emptyResults.hidden = visibleCount !== 0;
  }

  articleSearch.addEventListener("input", filterArticles);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      filterArticles();
    });

    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });

  filterArticles();
}
