import{s as c}from"./supabase.BU7h_rOJ.js";const r=async n=>{const e=document.getElementById(`feed-container-${n}`);if(e)try{const{data:t,error:o}=await c.from("stack_resources").select("*").eq("layer_id",n).limit(3);t&&t.length>0?e.innerHTML=t.map(s=>`
        <a href="${s.url}" target="_blank" class="resource-card">
          <span class="type-tag">${s.type.replace("-"," ")}</span>
          <h4>${s.title}</h4>
          <p>${s.domain?`Domain: ${s.domain}`:""}</p>
        </a>
      `).join(""):e.innerHTML="<p>No implementation guides found for this layer yet.</p>"}catch(t){console.error("Failed to fetch resources:",t),e.innerHTML="<p>Error loading resources.</p>"}};document.querySelectorAll(".toggle-btn").forEach(n=>{n.addEventListener("click",async()=>{const e=n.getAttribute("data-target"),t=e.split("-")[1],o=document.getElementById(e),s=document.getElementById(`desc-${t}`),l=document.getElementById(`resources-${t}`);l&&l.classList.contains("hidden")&&await r(t),n.classList.toggle("active"),o.classList.toggle("hidden"),s.classList.toggle("hidden"),l.classList.toggle("hidden")})});const a=document.getElementById("tool-search");a&&a.addEventListener("input",n=>{const e=n.target.value.toLowerCase();document.querySelectorAll(".tool").forEach(o=>{const s=o.textContent?.toLowerCase()||"";o.style.display=s.includes(e)?"inline-flex":"none"}),document.querySelectorAll(".resource-card").forEach(o=>{const s=o.textContent.toLowerCase();o.style.display=s.includes(e)?"block":"none"})});window.openToolModal=async n=>{const e=document.getElementById("tool-modal"),t=document.getElementById("modal-results");e.classList.remove("hidden"),t.innerHTML="<p>Loading related research...</p>";const{data:o,error:s}=await c.from("stack_resources").select("title, slug, url").eq("tool_slug",n);o&&o.length>0?resultsContainer.innerHTML=o.map(l=>`
        <div class="modal-item">
          <span class="tag">${l.tag}</span>
          <h4>${l.title}</h4>
          <div class="modal-links">
            <a href="/stack/tools/${l.slug}" class="deep-dive-btn">View Analysis</a>
            <a href="${l.url}" target="_blank" class="source-link">Original Source ↗</a>
          </div>
        </div>
      `).join(""):resultsContainer.innerHTML="<p>No specific articles found for this tool yet.</p>"};window.closeToolModal=()=>{document.getElementById("tool-modal").classList.add("hidden")};
