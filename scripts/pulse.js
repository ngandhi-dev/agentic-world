import { supabase } from "../lib/supabase";

const initPulse = () => {
  // Your JavaScript code here
  let activeSlug = ""; // Variable to track which issue is open
  // 1. DECLARE AT THE TOP (Global Scope)
  let currentSharedSlug = "";
  const modal = document.getElementById("reader-modal");
  const modalContent = document.getElementById("modal-content-area");
  const closeBtn = document.getElementById("close-modal");
  const triggers = document.querySelectorAll(".issue-card-trigger");
  const modalBody = document.querySelector(".modal-body-wrapper");
  const progressBar = document.getElementById("reading-progress-bar");

  // 1. SELECTORS (Declare all once at the top)
  const toggleBtn = document.getElementById("toggle-bookmarks");
  const bookmarkBadge = document.getElementById("bookmark-count");
  const searchInput = document.getElementById("pulse-search");
  const tagSelect = document.getElementById("filter-tag");
  const sourceSelect = document.getElementById("filter-source");
  const cards = document.querySelectorAll(".issue-card-trigger");
  const resultsBadge = document.getElementById("search-results-count");

  // A helper to check if the database is ready and the page is active
  const isRunnable = () => typeof window !== "undefined" && supabase;

  // 2. BOOKMARK HELPERS
  const getBookmarks = () =>
    JSON.parse(localStorage.getItem("pulse_bookmarks") || "[]");

  const updateBookmarkUI = () => {
    const bookmarks = getBookmarks();
    if (bookmarkBadge) bookmarkBadge.innerText = bookmarks.length;

    document.querySelectorAll(".bookmark-btn").forEach((btn) => {
      const slug = btn.getAttribute("data-slug");
      btn.classList.toggle("is-bookmarked", bookmarks.includes(slug));
    });
  };

  // 3. CONSOLIDATED FILTER ENGINE
  const updateAllFilters = () => {
    const activeTag = tagSelect?.value || "all";
    const activeSource = sourceSelect?.value || "all";
    const onlySaved = toggleBtn?.classList.contains("active");
    const searchQuery = searchInput?.value.toLowerCase() || "";
    const bookmarks = getBookmarks();

    let visibleCount = 0;

    cards.forEach((card) => {
      const slug = card.getAttribute("data-slug");
      const cardTag = card.getAttribute("data-tag");
      const title = card.getAttribute("data-title")?.toLowerCase() || "";
      const isExternal = card.getAttribute("data-is-external") === "true";

      const matchesTag = activeTag === "all" || cardTag === activeTag;
      const matchesSource =
        activeSource === "all" ||
        (activeSource === "external" && isExternal) ||
        (activeSource === "internal" && !isExternal);
      const matchesSaved = !onlySaved || bookmarks.includes(slug);
      const matchesSearch = title.includes(searchQuery);

      if (matchesTag && matchesSource && matchesSaved && matchesSearch) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    // Existing function to hide empty headers
    if (typeof checkSectionHeaders === "function") checkSectionHeaders();
    if (resultsBadge) resultsBadge.innerText = `${visibleCount} results`;
  };

  // 4. EVENT LISTENERS
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".bookmark-btn");
    if (!btn) return;

    e.stopPropagation();
    const slug = btn.getAttribute("data-slug");
    let bookmarks = getBookmarks();

    if (bookmarks.includes(slug)) {
      bookmarks = bookmarks.filter((b) => b !== slug);
    } else {
      bookmarks.push(slug);
    }

    localStorage.setItem("pulse_bookmarks", JSON.stringify(bookmarks));
    updateBookmarkUI();
    updateAllFilters(); // Refresh list immediately
  });

  toggleBtn?.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    updateAllFilters();
  });

  // Attach search and select listeners
  [searchInput, tagSelect, sourceSelect].forEach((el) => {
    el?.addEventListener("input", updateAllFilters);
    el?.addEventListener("change", updateAllFilters);
  });

  // 5. INITIALIZE
  updateBookmarkUI();
  loadCounts(); // Your existing Supabase count function

  if (modalBody && progressBar) {
    modalBody.addEventListener("scroll", () => {
      const totalHeight = modalBody.scrollHeight - modalBody.clientHeight;
      const scrollPosition = modalBody.scrollTop;

      if (totalHeight > 0) {
        const percentage = (scrollPosition / totalHeight) * 100;
        progressBar.style.width = `${percentage}%`;
      }
    });
  }

  // Reset progress bar when modal is closed
  closeBtn.addEventListener("click", () => {
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 400); // Wait for fade-out animation
  });

  // --- 1. TRACK PAGE VISIT ---
  async function trackPageVisit(path) {
    if (!isRunnable()) return;
    console.log("System Check: Tracking visit for", path);
    // Clean the path if it contains a full URL
    const cleanPath = path.replace("https://", "").replace("http://", "");
    // Check if supabase client exists and has an auth header
    if (!supabase || !supabase.supabaseKey) {
      console.warn("Supabase client not initialized. Visit tracking disabled.");
      return;
    }
    try {
      const { error } = await supabase.rpc("increment_visit", {
        page_url: path,
      });
      if (error) throw error;
    } catch (err) {
      // If the error contains 'callback', it's a lifecycle issue we can ignore
      if (!err.message.includes("callback")) {
        console.error("Tracking Error:", err.message);
      }
    }
    // const { error } = await supabase.from("site_visits").insert([
    //  {
    //    page_path: cleanPath,
    //    last_visited: new Date().toISOString(),
    //  },
    //]);
    //if (error) console.error("Tracking Error:", error.message);
  }

  // Track the archive page itself on load
  trackPageVisit(window.location.pathname);

  // --- 2. MODAL & INDIVIDUAL ISSUE TRACKING ---
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", async () => {
      const isExternal = trigger.getAttribute("data-is-external") === "true";
      const title = trigger.getAttribute("data-title");
      const summary = trigger.getAttribute("data-summary");
      const externalUrl = trigger.getAttribute("data-url");
      const tag = trigger.getAttribute("data-tag");
      const date = trigger.getAttribute("data-date"); // Ensure you have this attr
      currentSharedSlug = trigger.getAttribute("data-slug");

      // 2. Select the title element in the modal
      const mTitle = document.getElementById("modal-title");
      const mDate = document.getElementById("modal-date");
      // 3. Inject the real title
      if (mTitle) mTitle.innerText = title;
      if (mDate) mDate.innerText = date;

      if (!modal || !modalContent) return;

      // 1. Open Modal and show loading
      modal.classList.add("open");
      document.body.style.overflow = "hidden";

      const fullArticleBtn = document.getElementById("full-article-btn");
      const modalTag = document.getElementById("modal-tag");

      if (isExternal) {
        // 1. Define the tracking path for external items
        // We use the slug (URL) as the unique identifier for the visit
        const path = `/pulse/${currentSharedSlug}`;

        // 2. TRIGGER THE VIEW COUNT INCREASE
        trackPageVisit(path);

        // 3. Populate Modal Content
        modalContent.innerHTML = `
                                    <div class="modal-full-content">
                                      ${summary
                                        .split("\n")
                                        .map((para) => `<p>${para}</p>`)
                                        .join("")}
                                  </div>
                                  <blockquote class="modal-attribution">
                                      This insight was summarized by Agentic Pulse. Click the button below to view the original source.
                                  </blockquote>
                                `;
        if (fullArticleBtn) {
          fullArticleBtn.href = externalUrl;
          fullArticleBtn.classList.remove("hidden");
        }
        if (modalTag) modalTag.innerText = tag;
      } else {
        // --- LOGIC FOR LOCAL MARKDOWN ITEMS ---
        modalContent.innerHTML =
          '<div class="loading-state"><div class="spinner"></div><p>Accessing the Pulse...</p></div>';
        if (fullArticleBtn) fullArticleBtn.classList.add("hidden");

        const path = `/pulse/${currentSharedSlug}`;
        trackPageVisit(path);

        try {
          const res = await fetch(path);
          const html = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const extractedContent =
            doc.querySelector(".content") ||
            doc.querySelector("main") ||
            doc.querySelector("article") ||
            doc.body;
          if (extractedContent)
            modalContent.innerHTML = extractedContent.innerHTML;
        } catch (err) {
          modalContent.innerHTML = "<p>Error loading content.</p>";
        }
      }
    });
  });

  // Logic for the Modal Share Button
  const modalShareBtn = document.getElementById("modal-share-btn");
  modalShareBtn?.addEventListener("click", () => {
    const shareUrl = `${window.location.origin}/pulse/${currentSharedSlug}`;

    if (navigator.share) {
      navigator.share({
        title: "Agentic Pulse Insight",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  });

  // --- 3. LOAD LIVE VIEW COUNTS ---
  async function loadCounts() {
    if (!isRunnable()) return;

    const CACHE_KEY = "pulse_counts_cache";
    const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

    // 1. Check Local Cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TIME) {
        console.log("Loading counts from cache");
        updateUIWithCounts(data);
        return;
      }
    }

    // 2. Database Trip (only if cache is old/missing)
    try {
      const { data, error } = await supabase
        .from("site_visits")
        .select("page_path, visit_count");
      if (!error && data) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            data: data,
          })
        );
        updateUIWithCounts(data);
      }

      //if (error) return console.error("Load Counts Error:", error.message);

      //document.querySelectorAll(".live-count").forEach((badge) => {
      //  const path = badge.getAttribute("data-path");

      // 3. Find the record where the database path matches the card path
      //const record = data?.find((r) => r.page_path === path);

      //console.log(
      //  `Checking path: ${path} | Found: ${record?.visit_count || "None"}`
      //);
      //const span = badge.querySelector(".count-number");
      //if (span) span.innerText = record ? record.visit_count : "0";
      //});

      //console.log("Counters synchronized successfully");

      // Only update DOM if elements still exist
      //data.forEach((stat) => {
      //  const container = document.querySelector(
      //    `.live-count[data-path="${stat.url}"] .count-number`
      //  );
      //  if (container) container.innerText = stat.count;
      //});
    } catch (err) {
      console.error("Cache fetch failed", err);
      /*if (!err.message.includes("callback")) {
        console.error("Load Counts Error:", err.message);
      }*/
    }
  }

  // Helper to keep logic clean
  function updateUIWithCounts(data) {
    document.querySelectorAll(".live-count").forEach((badge) => {
      const path = badge.getAttribute("data-path");
      const record = data?.find((r) => r.page_path === path);
      const span = badge.querySelector(".count-number");
      if (span) span.innerText = record ? record.visit_count : "0";
    });
  }

  // Close modal logic
  closeBtn?.addEventListener("click", () => {
    modal?.classList.remove("open");
    document.body.style.overflow = "";
    loadCounts(); // Refresh counts when closing
  });

  // Initial load
  loadCounts();

  // Share Menu Toggle
  const shareBtn = document.getElementById("share-btn");
  const shareMenu = document.getElementById("share-menu");

  shareBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    shareMenu?.classList.toggle("active");
  });

  // Sharing Logic
  window.shareTo = (platform) => {
    const url = encodeURIComponent(
      `${window.location.origin}/pulse/${currentSharedSlug}`
    );
    const text = encodeURIComponent(
      "Check out this Agentic AI insight from the Pulse Archive!"
    );

    const links = {
      x: `https://x.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(links[platform], "_blank");
    shareMenu?.classList.remove("active");
  };

  window.copyLink = () => {
    const fullUrl = `${window.location.origin}/pulse/${currentSharedSlug}`;
    navigator.clipboard.writeText(fullUrl);
    alert("Link copied to clipboard!");
    shareMenu?.classList.remove("active");
  };

  // Close menu if clicking outside
  document.addEventListener("click", () =>
    shareMenu?.classList.remove("active")
  );

  // --- 4. SIDEBAR AUTO-HIGHLIGHT LOGIC ---
  const observerOptions = {
    root: null, // use the viewport
    rootMargin: "-10% 0px -70% 0px", // trigger when section is in the top portion of the screen
    threshold: 0,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. Get the ID of the visible section
        const id = entry.target.getAttribute("id");

        // 2. Remove 'active' class from all sidebar links
        document
          .querySelectorAll(".toc-month-link, .toc-week-link")
          .forEach((link) => {
            link.classList.remove("active");
          });

        // 3. Add 'active' class to the matching sidebar link
        const activeLink = document.querySelector(`a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");

          // 4. If it's a week link, also highlight the parent month
          if (activeLink.classList.contains("toc-week-link")) {
            const parentMonth = activeLink
              .closest(".toc-month-section")
              ?.querySelector(".toc-month-link");
            parentMonth?.classList.add("active");
          }
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Track all month and week blocks
  document.querySelectorAll(".month-block, .week-block").forEach((section) => {
    observer.observe(section);
  });

  // --- BACK TO TOP LOGIC ---
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // --- SMOOTH SCROLL OFFSET FIX ---
  // This ensures that when you click a sidebar link, it doesn't jump too far down
  document
    .querySelectorAll(".toc-month-link, .toc-week-link")
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Adjust this number to match your header height
            behavior: "smooth",
          });
        }
      });
    });

  // --- 5. SEARCH LOGIC ---
  //const searchInput = document.getElementById("pulse-search");
  //const resultsBadge = document.getElementById("search-results-count");
  //const cards = document.querySelectorAll(".issue-card-trigger");
  const monthBlocks = document.querySelectorAll(".month-block");
  const weekBlocks = document.querySelectorAll(".week-block");

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    // 1. Filter Individual Cards
    cards.forEach((card) => {
      const title = card.getAttribute("data-title")?.toLowerCase() || "";
      const summary = card.getAttribute("data-summary")?.toLowerCase() || "";
      const tag = card.getAttribute("data-tag")?.toLowerCase() || "";
      const url = card.getAttribute("data-url")?.toLowerCase() || "";

      const isMatch =
        title.includes(query) ||
        summary.includes(query) ||
        tag.includes(query) ||
        url.includes(query);

      if (isMatch) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    // 2. Hide Week/Month headers if they have no visible cards
    weekBlocks.forEach((week) => {
      const visibleCardsInWeek = week.querySelectorAll(
        ".issue-card-trigger:not(.hidden)"
      ).length;
      week.classList.toggle("hidden", visibleCardsInWeek === 0);
    });

    monthBlocks.forEach((month) => {
      const visibleWeeksInMonth = month.querySelectorAll(
        ".week-block:not(.hidden)"
      ).length;
      month.classList.toggle("hidden", visibleWeeksInMonth === 0);
    });

    // 3. Update Results Badge
    if (query.length > 0) {
      resultsBadge.style.display = "block";
      resultsBadge.innerText = `${visibleCount} results`;
    } else {
      resultsBadge.style.display = "none";
    }
  });

  // --- 6. BOOKMARKING LOGIC ---
  const bookmarkBtns = document.querySelectorAll(".bookmark-btn");

  // Function to get bookmarks from LocalStorage
  //function getBookmarks() {
  //  const saved = localStorage.getItem("pulse_bookmarks");
  //  return saved ? JSON.parse(saved) : [];
  //}

  // Function to update UI based on saved bookmarks
  function initBookmarks() {
    const bookmarks = getBookmarks();
    bookmarkBtns.forEach((btn) => {
      const slug = btn.getAttribute("data-slug");
      if (bookmarks.includes(slug)) {
        btn.classList.add("is-bookmarked");
      }
    });
  }

  // Handle Click Events
  bookmarkBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent opening the modal when clicking bookmark

      const slug = btn.getAttribute("data-slug");
      let bookmarks = getBookmarks();

      if (bookmarks.includes(slug)) {
        // Remove bookmark
        bookmarks = bookmarks.filter((b) => b !== slug);
        btn.classList.remove("is-bookmarked");
      } else {
        // Add bookmark
        bookmarks.push(slug);
        btn.classList.add("is-bookmarked");
      }

      localStorage.setItem("pulse_bookmarks", JSON.stringify(bookmarks));
    });
  });

  // Run on page load
  initBookmarks();

  //const toggleBtn = document.getElementById("toggle-bookmarks");
  let showingOnlyBookmarks = false;
  const bookmarkCountBadge = document.getElementById("bookmark-count");

  // Function to update the count on the button itself
  /*function updateBookmarkUI() {
    const bookmarks = getBookmarks();
    if (bookmarkCountBadge) {
      bookmarkCountBadge.innerText = bookmarks.length;
    }
  }*/

  toggleBtn?.addEventListener("click", () => {
    showingOnlyBookmarks = !showingOnlyBookmarks;
    const isNowActive = toggleBtn.classList.toggle("active");
    const bookmarks = getBookmarks();

    // Reuse your visibility update logic
    updateVisibility(isNowActive, bookmarks);

    toggleBtn.classList.toggle("active", showingOnlyBookmarks);

    cards.forEach((card) => {
      const slug = card.getAttribute("data-slug");
      if (showingOnlyBookmarks && !bookmarks.includes(slug)) {
        card.classList.add("hidden");
      } else {
        // Respect the current search query if applicable
        card.classList.remove("hidden");
      }
    });

    // Reuse your existing logic to hide empty month/week headers
    updateSectionVisibility();
  });

  function updateVisibility(onlyBookmarks, bookmarks) {
    const cards = document.querySelectorAll(".issue-card-trigger");

    cards.forEach((card) => {
      const slug = card.getAttribute("data-slug");
      const matchesSearch = !card.classList.contains("search-hidden"); // Check search state

      if (onlyBookmarks) {
        if (bookmarks.includes(slug) && matchesSearch) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      } else {
        // If filter is off, respect search results
        card.classList.toggle("hidden", !matchesSearch);
      }
    });
    // Re-run header visibility check (the logic from search script)
    checkSectionHeaders();
  }

  // Initialize on load
  updateBookmarkUI();

  // --- 8. MULTI-FILTER ENGINE ---
  //const tagSelect = document.getElementById("filter-tag");
  //const sourceSelect = document.getElementById("filter-source");
  const clearBtn = document.getElementById("clear-filters");

  // Listeners
  tagSelect.addEventListener("change", updateAllFilters);
  sourceSelect.addEventListener("change", updateAllFilters);
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    updateAllFilters();
  });
  searchInput.addEventListener("input", updateAllFilters);

  clearBtn.addEventListener("click", () => {
    tagSelect.value = "all";
    sourceSelect.value = "all";
    toggleBtn.classList.remove("active");
    searchInput.value = "";
    updateAllFilters();
  });
};

// Run on initial load
initPulse();

// If you use Astro's View Transitions, run on every page swap
//document.addEventListener("astro:page-load", initPulse);
