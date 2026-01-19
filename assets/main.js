// *********************************** SUPABASE CLIENT INIT *********************************** //
let supabase;

const initApp = async () => {
  const configEl = document.getElementById("supabase-config");

  // 1. WAIT FOR CDN: If Supabase isn't ready yet, try again in 50ms
  if (!window.supabase || !configEl) {
    setTimeout(initApp, 50);
    return;
  }

  // 2. INITIALIZE CLIENT (Only once)
  if (!window.supabaseClient) {
    const { url, key } = configEl.dataset;
    window.supabaseClient = window.supabase.createClient(url, key);
  }

  try {
    // 3. ENFORCE LOGIN
    const {
      data: { session },
    } = await window.supabaseClient.auth.getSession();
    const path = window.location.pathname;

    // Define public pages that DON'T need a login
    const isPublicPage = path === "/"; //|| path === "/about" || path.startsWith("/pulse");

    if (!session && !isPublicPage) {
      // && path !== "/hub") {
      // Redirect to your login entry point (usually the Hub)
      window.location.href = "/login";
      return;
    }

    // 4. ACTIVATE UI
    document.body.classList.add("ready");

    // 5. RUN PAGE LOGIC
    if (path.includes("/pulse")) initPulsePage();
    if (document.getElementById("newsletter-config")) initNewsletter();
  } catch (error) {
    console.error("Initialization Error:", error);
    document.body.classList.add("ready"); // Safety valve: show site anyway
  }
};

// Start the sequence
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
// *********************************** ISSUE LAYOUT CODE *********************************** //
const copyBtn = document.getElementById("copy-link-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const url = copyBtn.dataset.url;
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  });
}

const twitterBtn = document.getElementById("twitter-link-btn");
if (twitterBtn) {
  twitterBtn.addEventListener("click", () => {
    const url = twitterBtn.dataset.url;
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  });
}

const linkedInBtn = document.getElementById("linkedin-link-btn");
if (linkedInBtn) {
  linkedInBtn.addEventListener("click", () => {
    const url = linkedInBtn.dataset.url;
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  });
}

// *********************************** COLLECTION OF FUNCTIONS *********************************** //
// Track page visit via Supabase RPC
async function trackVisit(path = window.location.pathname) {
  console.log("System Check: Tracking visit for", path);
  if (!window.supabaseClient) return;

  try {
    await window.supabaseClient.rpc("increment_visit", {
      page_url: path,
    });
  } catch (err) {
    console.error("Tracking Error:", err.message);
  }
}

function hasCookie(name) {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(`${name}=`));
}

// AUTH REDIRECT LOGIC on Different Environments
function initAuthRedirect() {
  const isLocal = window.location.hostname === "localhost";
  // If local, base is empty. If GitHub, base is your repo name.
  const base = isLocal ? "/" : "/";

  // Ensure we don't accidentally double-slash
  const loginPath = `${base}/login/`.replace(/\/+/g, "/");

  const hasSession = document.cookie.includes("sb-access-token=");
  const path = window.location.pathname;

  if (!hasSession && !path.includes("/login")) {
    window.location.replace(loginPath);
  }

  /*const { hostname, pathname } = window.location;

  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

  const base = isLocal ? "" : "/";

  // Normalize pathname
  const normalizedPath = pathname.endsWith("/") ? pathname : pathname + "/";

  const onLoginPage = normalizedPath.endsWith("/login/");

  const hasSession = hasCookie("sb-access-token");*/

  // RULE 1: If NO session and NOT at login → redirect to login
  /*
  if (!hasSession && !onLoginPage) {
    window.location.replace(`${base}/login/`);
    return;
  }
  */

  // RULE 2: If HAS session and IS at login → redirect to stack
  /*
  if (hasSession && onLoginPage) {
    setTimeout(() => {
      window.location.replace(`${base}/stack/`);
    }, 50);
  }
  */
}

// *********************** Pulse initialization function START (defined in pulse.js) *********************** //
const initPulsePage = () => {
  // 1. THE GUARD: Only run if we are on the Pulse page
  const pulseContainer =
    document.getElementById("pulse-search") ||
    document.querySelector(".issue-card");
  if (!pulseContainer) return;

  console.log("Pulse logic initialized.");

  // --- STATE & SELECTORS ---
  let currentSharedSlug = "";
  const modal = document.getElementById("pulse-modal");
  const contentArea = document.getElementById("modal-content-area");
  const modalTitle = document.getElementById("modal-title-small");
  const modalMainTitle = document.getElementById("modal-title-main");
  const modalSmallTitle = document.getElementById("modal-title-small");
  const closeBtn = document.getElementById("close-modal");
  const progressBar = document.getElementById("reading-progress-bar");
  const modalBody = document.querySelector(".modal-body-wrapper");

  const searchInput = document.getElementById("pulse-search");
  const tagSelect = document.getElementById("filter-tag");
  const sourceSelect = document.getElementById("filter-source");
  const toggleBtn = document.getElementById("toggle-bookmarks");
  const bookmarkBadge = document.getElementById("bookmark-count");
  const resultsBadge = document.getElementById("search-results-count");

  // Important: Selecting the cards
  const cards = document.querySelectorAll(".issue-card");

  // Move loadCounts INSIDE or ABOVE where it's called
  async function loadCounts() {
    if (!window.supabaseClient) return;
    try {
      const { data, error } = await window.supabaseClient
        .from("site_visits")
        .select("page_path, visit_count");

      if (!error && data) {
        document.querySelectorAll(".live-count").forEach((badge) => {
          const path = badge.getAttribute("data-path");
          const record = data.find((r) => r.page_path === path);
          const span = badge.querySelector(".count-number");
          if (span) span.innerText = record ? record.visit_count : "0";
        });
      }
    } catch (err) {
      console.error("Load Counts Error:", err);
    }
  }

  // --- 1. MODAL & READ MORE LOGIC (THE FIX) ---
  const openModal = async (card) => {
    // Determine data source (supports both JSON attribute or individual data-attrs)
    let data = {};
    if (card.dataset.fullIssue) {
      data = JSON.parse(card.dataset.fullIssue);
    } else {
      data = {
        title: card.getAttribute("data-title"),
        excerpt: card.getAttribute("data-summary"),
        url: card.getAttribute("data-url"),
        tag: card.getAttribute("data-tag"),
        date: card.getAttribute("data-date"),
        slug: card.getAttribute("data-slug"),
        isExternal: card.getAttribute("data-is-external") === "true",
      };
    }

    currentSharedSlug = data.slug || data.url;
    // Inject the data into your modal elements...
    document.getElementById("modal-title-main").textContent = data.title;

    // Update UI
    if (modalMainTitle) modalMainTitle.textContent = data.title;
    if (modalTitle) modalTitle.textContent = data.tag;

    // Show Loading state for Internal, or Summary for External
    if (data.isExternal) {
      contentArea.innerHTML = `
        <div class="modal-summary">
          <p class="date-meta">Published on ${data.date}</p>
          <div class="summary-text">${data.excerpt}</div>
          <hr class="modal-divider" />
          <div class="modal-actions">
            <a href="${data.url}" target="_blank" class="primary-btn">View Original Source</a>
          </div>
        </div>`;
      trackVisit(`/pulse/${currentSharedSlug}`);
    } else {
      contentArea.innerHTML =
        '<div class="loading-state"><div class="spinner"></div><p>Accessing the Pulse...</p></div>';

      // Fetch Local Content
      try {
        const path = `/pulse/${currentSharedSlug}`;
        trackVisit(path);
        const res = await fetch(path);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const content =
          doc.querySelector(".content") ||
          doc.querySelector("main") ||
          doc.body;
        contentArea.innerHTML = content.innerHTML;
      } catch (err) {
        contentArea.innerHTML = "<p>Error loading content.</p>";
      }
    }

    updateModalShareButtons(currentSharedSlug, data.title);
    modal.classList.remove("hidden");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (progressBar) progressBar.style.width = "0%";
    loadCounts(); // Refresh view counts on close
  };

  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // --- 2. SIDEBAR HIGHLIGHTING (Intersection Observer) ---
  const sections = document.querySelectorAll(
    ".month-section, .month-block, .week-block",
  );
  const navLinks = document.querySelectorAll(
    ".sidebar-month-link, .toc-month-link, .toc-week-link",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" },
  );

  sections.forEach((section) => observer.observe(section));

  // --- 3. FILTER & SEARCH ENGINE ---
  const updateAllFilters = () => {
    const activeTag = tagSelect?.value || "all";
    const activeSource = sourceSelect?.value || "all";
    const onlySaved = toggleBtn?.classList.contains("active");
    const searchQuery = searchInput?.value.toLowerCase().trim() || "";
    const bookmarks = getBookmarks();

    let visibleCount = 0;

    cards.forEach((card) => {
      const data = card.dataset.fullIssue
        ? JSON.parse(card.dataset.fullIssue)
        : {};
      const slug = data.slug || card.getAttribute("data-slug");
      const cardTag = data.tag || card.getAttribute("data-tag");
      const title = (
        data.title ||
        card.getAttribute("data-title") ||
        ""
      ).toLowerCase();
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

    // Hide empty month/week headers
    document
      .querySelectorAll(".month-block, .week-block, .month-section")
      .forEach((section) => {
        const hasVisibleCards =
          section.querySelectorAll(".issue-card:not(.hidden)").length > 0;
        section.classList.toggle("hidden", !hasVisibleCards);
      });

    if (resultsBadge) {
      resultsBadge.innerText = `${visibleCount} results`;
      resultsBadge.style.display = searchQuery ? "block" : "none";
    }
  };

  // --- 4. BOOKMARKS ---
  const getBookmarks = () =>
    JSON.parse(localStorage.getItem("pulse_bookmarks") || "[]");

  const updateBookmarkUI = () => {
    const bookmarks = getBookmarks();
    if (bookmarkBadge) bookmarkBadge.innerText = bookmarks.length;
    document.querySelectorAll(".bookmark-btn").forEach((btn) => {
      btn.classList.toggle(
        "is-bookmarked",
        bookmarks.includes(btn.dataset.slug),
      );
    });
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".bookmark-btn");
    if (!btn) return;
    e.stopPropagation();
    const slug = btn.dataset.slug;
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.includes(slug)
      ? bookmarks.filter((b) => b !== slug)
      : [...bookmarks, slug];
    localStorage.setItem("pulse_bookmarks", JSON.stringify(bookmarks));
    updateBookmarkUI();
    updateAllFilters();
  });

  // --- 5. INITIALIZATION & UTILS ---
  const updateModalShareButtons = (slug, title) => {
    const shareContainer = document.getElementById("modal-social-share");
    if (!shareContainer) return;
    const shareUrl = `https://www.agentsicworld.com/pulse/${slug}`;
    shareContainer.innerHTML = `
        <button class="share-btn copy" onclick="navigator.clipboard.writeText('${shareUrl}'); alert('Link copied!');">Copy Link</button>
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}" target="_blank" class="share-btn twitter">X</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" target="_blank" class="share-btn linkedin">LinkedIn</a>
    `;
  };

  // Event Listeners for Filters
  [searchInput, tagSelect, sourceSelect].forEach((el) => {
    el?.addEventListener("input", updateAllFilters);
    el?.addEventListener("change", updateAllFilters);
  });
  toggleBtn?.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    updateAllFilters();
  });

  // Scroll Progress in Modal
  modalBody?.addEventListener("scroll", () => {
    const totalHeight = modalBody.scrollHeight - modalBody.clientHeight;
    if (totalHeight > 0 && progressBar) {
      progressBar.style.width = `${(modalBody.scrollTop / totalHeight) * 100}%`;
    }
  });

  updateBookmarkUI();
  loadCounts();
  trackVisit(window.location.pathname);
};
// *********************** Pulse initialization function END (defined in pulse.js) *********************** //

// *********************************** MAIN EXECUTION *********************************** //
// Run immediately
//trackVisit();

// Run immediately (script is at end of body)
initAuthRedirect();

(function () {
  const hasSession = document.cookie.includes("sb-access-token=");
  if (!hasSession && !window.location.pathname.includes("/login")) {
    window.location.replace("/login/");
  }
})();

// Reveal page once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("visible");
});

// ************************************ ISSUE LAYOUT FUNCTIONS *********************************** //
// Simple Scroll Progress Indicator
window.onscroll = function () {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressbar = document.getElementById("progress-bar");
  if (progressbar) {
    progressbar.style.width = scrolled + "%";
  }
};

// *********************************** LOGIN FORM HANDLER *********************************** //
const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");
const loginBtn = document.getElementById("login-btn");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");

if (loginForm) {
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // UI state updates
    if (messageEl) messageEl.classList.add("hidden");
    loginBtn.innerText = "AUTHENTICATING...";
    loginBtn.disabled = true;
    if (loginUsernameInput) {
      const username = loginUsernameInput.value.trim();
    }
    if (loginPasswordInput) {
      const password = loginPasswordInput.value;
    }

    try {
      // 1. Get email from username (since Supabase auth uses email)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("username", username)
        .single();

      if (profileError || !profile) throw new Error("Identity not found.");

      // 2. Sign in
      const { data, error: authError } =
        await window.supabaseClient.auth.signInWithPassword({
          email: profile.email,
          password: password,
        });

      if (authError) throw authError;

      if (data.session) {
        const { access_token, refresh_token } = data.session;
        // Set cookies with path=/ so they are visible globally
        document.cookie = `sb-access-token=${access_token}; path=/; max-age=604800; SameSite=Lax`;
        document.cookie = `sb-refresh-token=${refresh_token}; path=/; max-age=604800; SameSite=Lax`;

        // FIX: Match the base path logic used in the Gatekeeper
        const isLocal = window.location.hostname === "localhost";
        const base = "";

        // Add a tiny buffer before redirecting to ensure cookie persistency
        setTimeout(() => {
          window.location.replace(base + "/stack/");
        }, 100);
      }
    } catch (err) {
      if (messageEl) {
        messageEl.innerText = err.message;
        messageEl.classList.remove("hidden");
      }
    } finally {
      loginBtn.innerText = "LOGIN";
      loginBtn.disabled = false;
    }
  });
}

// ***************************************** STACK.ASTRO *********************************** //
const fetchResources = async (layerId) => {
  const container = document.getElementById(`feed-container-${layerId}`);
  if (container) {
    // The try block must wrap the code that might fail
    try {
      const { data, error } = await supabase
        .from("stack_resources")
        .select("*")
        .eq("layer_id", layerId)
        .limit(3);

      if (data && data.length > 0) {
        container.innerHTML = data
          .map(
            (item) => `
        <a href="${item.url}" target="_blank" class="resource-card">
          <span class="type-tag">${item.type.replace("-", " ")}</span>
          <h4>${item.title}</h4>
          <p>${item.domain ? `Domain: ${item.domain}` : ""}</p>
        </a>
      `,
          )
          .join("");
      } else {
        container.innerHTML =
          "<p>No implementation guides found for this layer yet.</p>";
      }
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      container.innerHTML = "<p>Error loading resources.</p>";
    }
  }
};

document.querySelectorAll(".toggle-btn").forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-target");
      const layerId = targetId.split("-")[1];
      const codeBlock = document.getElementById(targetId);
      const descBlock = document.getElementById(`desc-${layerId}`);
      const resourceFeed = document.getElementById(`resources-${layerId}`);

      // Fetch resources only when opening the section
      if (resourceFeed && resourceFeed.classList.contains("hidden")) {
        await fetchResources(layerId);
      }
      btn.classList.toggle("active");
      if (codeBlock) {
        codeBlock.classList.toggle("hidden");
      }
      if (descBlock) {
        descBlock.classList.toggle("hidden");
      }
      if (resourceFeed) {
        resourceFeed.classList.toggle("hidden");
      }
    });
  }
});
// 2. Handle Search (Moved outside the toggle loop)
const searchInput = document.getElementById("tool-search");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const toolPills = document.querySelectorAll(".tool"); // targeting our tool links

    toolPills.forEach((pill) => {
      const name = pill.textContent?.toLowerCase() || "";
      pill.style.display = name.includes(term) ? "inline-flex" : "none";
    });

    // Filter Resource Cards
    document.querySelectorAll(".resource-card").forEach((card) => {
      const content = card.textContent.toLowerCase();
      card.style.display = content.includes(term) ? "block" : "none";
    });
  });
}

const toolmodal = document.getElementById("tool-modal");
const toolcontent = document.getElementById("modal-results");

window.openToolModal = async (toolSlug) => {
  if (toolmodal) {
    toolmodal.classList.remove("hidden");
  }

  if (toolcontent) {
    toolcontent.innerHTML = "<p>Loading related research...</p>";
  }

  const { data, error } = await supabase
    .from("stack_resources")
    .select("title, slug, url")
    .eq("tool_slug", toolSlug);

  if (data && data.length > 0) {
    resultsContainer.innerHTML = data
      .map(
        (item) => `
        <div class="modal-item">
          <span class="tag">${item.tag}</span>
          <h4>${item.title}</h4>
          <div class="modal-links">
            <a href="/stack/tools/${item.slug}" class="deep-dive-btn">View Analysis</a>
            <a href="${item.url}" target="_blank" class="source-link">Original Source ↗</a>
          </div>
        </div>
      `,
      )
      .join("");
  } else {
    resultsContainer.innerHTML =
      "<p>No specific articles found for this tool yet.</p>";
  }
};

if (toolmodal) {
  window.closeToolModal = () => {
    toolmodal.classList.add("hidden");
  };
}

// *************** STACK PAGE SLUG DETECTION **************** //
// Logic to add copy buttons to H2 headers
const headers = document.querySelectorAll("article h2");

headers.forEach((header) => {
  header.classList.add("flex", "items-center", "gap-2", "group");

  const linkBtn = document.createElement("button");
  linkBtn.innerHTML = "🔗";
  linkBtn.className =
    "opacity-0 group-hover:opacity-100 transition-opacity text-sm cursor-pointer hover:scale-110";
  linkBtn.title = "Copy direct link";

  linkBtn.onclick = () => {
    const url = new URL(window.location.href);
    url.hash = header.id;
    navigator.clipboard.writeText(url.toString());

    // Brief visual feedback
    linkBtn.innerHTML = "✅";
    setTimeout(() => (linkBtn.innerHTML = "🔗"), 2000);
  };

  header.appendChild(linkBtn);
});

// *********************************** PULSE.ASTRO *********************************** //
// Wait for the DOM and the static pulse.js to be ready
window.addEventListener("load", () => {
  if (typeof initPulsePage === "function") {
    // Pass the supabase client into the global window object
    // so the static pulse.js can see it
    window.supabaseClient = supabase;

    // Call your function
    initPulsePage();
  }
});
// *********************************** SIGNUP PAGE *********************************** //
const signupform = document.getElementById("signup-form");
const singupmsg = document.getElementById("msg");

document.addEventListener("DOMContentLoaded", () => {
  if (signupform) {
    signupform?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const username = document.getElementById("username").value;

      if (email && username && password) {
        const { error } = await window.supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/api/auth/callback`,
            data: { username }, // This is captured by the SQL trigger
          },
        });
      }

      if (singupmsg) {
        if (error) {
          singupmsg.innerText = error.message;
          singupmsg.className =
            "mt-4 text-center text-red-400 bg-red-400/10 block";
        } else {
          singupmsg.innerText =
            "Success! Verification link sent to your email.";
          singupmsg.className =
            "mt-4 text-center text-green-400 bg-green-400/10 block";
          signupform.reset();
        }
      }
    });
  }
});

// *************************** PROFILE SETTING PAGE *********************************** //

const emailDisplay = document.getElementById("current-email");
const userDisplay = document.getElementById("current-username");
const settingsForm = document.getElementById("settings-form");
const settingsMessage = document.getElementById("settings-message");

// 1. Fetch user data on load
async function loadUserData() {
  // Use the global client we created
  if (!window.supabaseClient) {
    console.warn("Supabase not initialized yet for loadUserData.");
    return;
  }

  const {
    data: { user },
    error: userError,
  } = await window.supabaseClient.auth.getUser();

  if (userError || !user) {
    console.log("No active session found.");
    return;
  }

  if (user) {
    if (emailDisplay && userDisplay) {
      emailDisplay.innerText = user.email || "N/A";
      userDisplay.innerText = user.user_metadata.username || "Not set";
    } else {
      window.location.href = "/login"; // Redirect if not logged in
    }
  }
}

// 2. Handle Username Update
if (settingsForm) {
  settingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(settingsForm);
    if (formData.get("username") === null) return;
    const newUsername = formData.get("username").toString().trim();

    if (settingsMessage) {
      settingsMessage.classList.remove(
        "hidden",
        "text-red-400",
        "text-green-400",
      );
      settingsMessage.innerText = "Updating...";
    }
    const { data, error } = await window.supabaseClient.auth.updateUser({
      data: { username: newUsername },
    });

    if (settingsMessage) {
      if (error) {
        settingsMessage.innerText = error.message;
        settingsMessage.classList.add("text-red-400");
      } else {
        settingsMessage.innerText = "Username updated successfully!";
        settingsMessage.classList.add("text-green-400");
        if (userDisplay) {
          userDisplay.innerText = newUsername; // Update UI immediately
        }
      }
    }
  });
}

//loadUserData();

// ************************************* PASSWORD RESET PAGE ************************************* //
// Handle Password Update
const updatepasswordform = document.getElementById("update-form");
if (updatepasswordform) {
  updatepasswordform?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value;

    const { error } = await window.supabaseClient.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully!");
      window.location.href = "/login";
    }
  });
}

// Handle Password Reset Request
const passwordresetform = document.getElementById("reset-request-form");
if (passwordresetform) {
  passwordresetform?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value;

    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/update-password`,
      },
    );

    if (error) {
      alert(error.message);
    } else {
      alert("Success! Check your email for the reset link.");
    }
  });
}

// *********************************** HUB INDEX *********************************** //

const openBtn = document.getElementById("open-form");
const closeBtn = document.getElementById("close-form");
const modal = document.getElementById("form-modal");

function setupAuthListener() {
  // Check if our custom client is ready
  if (window.supabaseClient && window.supabaseClient.auth) {
    window.supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // Check if we have already handled this sign-in to prevent loops
        const hasReloaded = sessionStorage.getItem("auth_reloaded");

        if (!hasReloaded) {
          sessionStorage.setItem("auth_reloaded", "true");
          window.location.reload();
        }
      } else if (event === "SIGNED_OUT") {
        sessionStorage.removeItem("auth_reloaded");
        window.location.reload();
      }
    });
  } else {
    // If not ready, wait and try again
    setTimeout(setupAuthListener, 200);
  }
}

// Start the listener
setupAuthListener();

if (openBtn) {
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.classList.add("overflow-auto");
  });
}

// Close if user clicks outside the modal box
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.classList.add("overflow-auto");
  }
});
// *********************************** NEWSLETTER FORM *********************************** //
const newsletterform = document.getElementById("newsletter-form");
const emailInput = document.getElementById("subscriber-email");
const newsletterbtn = document.getElementById("submit-btn");

if (newsletterform) {
  newsletterform?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (emailInput.value) {
      const email = emailInput.value;
    } else {
      alert("Please enter a valid email address.");
      return;
    }
    if (newsletterbtn) {
      newsletterbtn.disabled = true;
      newsletterbtn.innerText = "Joining...";
    } else {
      return;
    }

    try {
      // 1. Sync to Supabase for your own records
      const { error: dbError } = await supabase
        .from("subscribers")
        .upsert(
          { email, updated_at: new Date() },
          { onConflict: "email", ignoreDuplicates: false },
        )
        .select();

      if (dbError) throw dbError;

      // 2. Send to Buttondown API (or use their embedded redirect)
      // For simplicity, we can trigger their native subscribe action now
      // 2. Call Buttondown directly from the browser
      // NOTE: You must use a PUBLIC API key or a different method if you want to keep it hidden.
      // For GitHub Pages, most people use Buttondown's native form action or a logic-less approach.
      const response = await fetch(
        "https://api.buttondown.email/v1/subscribers",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${import.meta.env.PUBLIC_BUTTONDOWN_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email_address: email }),
        },
      );

      const data = await response.json();

      // NEW: Handle the "Already Exists" case specifically
      if (!response.ok) {
        if (data.code === "email_already_exists") {
          alert(
            "You're already on the list! Check your inbox for the confirmation email. Click on the URL to get added to Opt-In.",
          );
          emailInput.value = "";
          return; // Exit successfully
        }
        throw new Error(data.detail || "API Error");
      }

      /* const formData = new FormData();
      formData.append('email', email);

      console.log("Sending to API:", email); // DEBUG: Check your browser console

      //'https://buttondown.email/api/emails/embed-subscribe/agentiicworld'
      const res = await fetch ('/api/subscribe', { // Fetch YOUR own local API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
        // mode: 'no-cors' // Required for cross-origin form posts
      });

      // 3. Add a check to see why it failed if it's not 'ok'
      const result = await res.json();
      console.log("API Response:", result); // DEBUG: Check what the server said
      if (!res.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      } */

      // NEW LOGIC: Send immediate welcome email via your Gmail SMTP API
      /* await fetch('/api/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          to: email, 
          subject: "Welcome to Agentic Pulse!",
          html: `<h1>Welcome!</h1><p>Thanks for joining the Pulse. You'll receive our weekly briefings at ${email}.</p>`
        })
      }); */

      alert(
        response.message ||
          "Welcome to the Pulse! Please check your inbox to confirm.",
      );
      emailInput.value = "";
    } catch (err) {
      console.error("Subscription failed:", err.message);
      alert("Something went wrong. Please try again.");
    } finally {
      newsletterbtn.disabled = false;
      newsletterbtn.innerText = "Subscribe";
    }
  });
}

// *********************************** NEWSLETTER MODAL *********************************** //
const newsletterModal = document.getElementById("newsletter-modal");

if (newsletterModal) {
  function closeNewsletterModal() {
    newsletterModal.classList.add("newsletter-modal-none");
    //newsletterModal.style.display = "none";
    localStorage.setItem("newsletterDismissed", "true");
  }

  window.addEventListener("load", () => {
    if (!localStorage.getItem("newsletterDismissed")) {
      setTimeout(() => {
        newsletterModal.classList.add("newsletter-modal-flex");
        //newsletterModal.style.display = "flex";
      }, 5000);
    }
  });
}

// *********************************** NEWSLETTER TEST SENDER *********************************** //
const sendtestbtn = document.getElementById("send-test-btn");
const status = document.getElementById("status-msg");
const newsletterConfig = document.getElementById("newsletter-config");
const subject = newsletterConfig
  ? newsletterConfig.dataset.subject
  : "Agentic Pulse Update";
// 1. Get the email input element (Add this ID to an input in your HTML)
const subscriberEmail = document.getElementById("subscriber-email");
const emailContainer = document.querySelector(".email-preview-container");

if (sendtestbtn) {
  sendtestbtn.addEventListener("click", async () => {
    const recipient = subscriberEmail?.value;
    if (!emailContainer) {
      console.error("Error: Could not find the email content container.");
      return;
    }

    if (!recipient) {
      status.innerText = "Please enter an email address.";
      status.className = "status-error";
      return;
    }
    sendtestbtn.disabled = true;
    status.innerText = "Sending...";

    // Grabs the HTML from the specific email container we created
    const emailHtml = emailContainer.outerHTML;

    try {
      const res = await fetch("/api/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2. Pass the recipient email in the body
        body: JSON.stringify({
          html: emailHtml,
          subject: subject,
          to: recipient,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        status.innerText = "Sent successfully!";
        status.classList.Add("status-success");
        //status.style.color = "#10b981"; // Green
      } else {
        status.innerText = `Error: ${result.error || "Failed to send"}`;
        status.classList.Add("status-error");
        //status.style.color = "#ef4444"; // Red
      }
    } catch (err) {
      status.innerText = "Network error occurred.";
      console.error(err);
    } finally {
      sendtestbtn.disabled = false;
    }
  });
}

// *********************************** TRIGGER GLOBAL LOGIC *********************************** //
const startApp = async () => {
  // 1. Wait for the Supabase SDK to load from CDN
  if (!window.supabaseClient) {
    setTimeout(startApp, 100);
    return;
  }

  // 2. Global Logic
  await loadUserData();
  trackVisit(window.location.pathname);

  // 3. Page-Specific Logic
  initPulsePage(); // This will only "fire" if it finds Pulse elements
  //initNewsletterEditor(); // If you moved newsletter logic here too
};

document.addEventListener("DOMContentLoaded", startApp);
// *********************************** END OF FILE *********************************** //
