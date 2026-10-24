
/*

      Add your design projects inside this array.
      Dates must use YYYY-MM-DD format.
      Newest projects will appear first.
    */

    const designs = [
      /*
      {
        title: "Creative Poster",
        category: "POSTER DESIGN",
        image: "images/poster.jpg",
        uploadedAt: "2026-10-22"
      },
      {
        title: "Brand Logo",
        category: "LOGO DESIGN",
        image: "images/logo.jpg",
        uploadedAt: "2026-10-20"
      }
      */
    ];

    const gallery = document.getElementById("designGallery");
    const emptyState = document.getElementById("emptyState");
    const projectCount = document.getElementById("projectCount");
    const sortSelect = document.getElementById("sortSelect");

    document.getElementById("year").textContent =
      new Date().getFullYear();

    function renderDesigns() {
      const sortedDesigns = [...designs];

      if (sortSelect.value === "newest") {
        sortedDesigns.sort((a, b) =>
          b.uploadedAt.localeCompare(a.uploadedAt)
        );
      } else if (sortSelect.value === "oldest") {
        sortedDesigns.sort((a, b) =>
          a.uploadedAt.localeCompare(b.uploadedAt)
        );
      } else if (sortSelect.value === "az") {
        sortedDesigns.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }

      gallery.replaceChildren();

      projectCount.textContent =
        `${sortedDesigns.length} ${
          sortedDesigns.length === 1 ? "project" : "projects"
        }`;

      emptyState.hidden = sortedDesigns.length > 0;
      gallery.hidden = sortedDesigns.length === 0;

      sortedDesigns.forEach((design) => {
        const card = document.createElement("article");
        card.className = "design-card";

        const image = document.createElement("img");
        image.className = "design-image";
        image.src = design.image;
        image.alt = design.title;
        image.loading = "lazy";

        image.addEventListener("error", () => {
          image.alt = `${design.title} image could not be loaded`;
          image.removeAttribute("src");
        });

        const info = document.createElement("div");
        info.className = "design-info";

        const category = document.createElement("p");
        category.className = "design-category";
        category.textContent = design.category;

        const title = document.createElement("h2");
        title.className = "design-title";
        title.textContent = design.title;

        const date = document.createElement("p");
        date.className = "design-date";
        date.textContent = "Uploaded: " + design.uploadedAt;

        info.append(category, title, date);
        card.append(image, info);
        gallery.append(card);
      });
    }

    sortSelect.addEventListener("change", renderDesigns);

    renderDesigns();
    