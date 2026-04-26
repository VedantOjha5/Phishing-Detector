// ==============================
// EXTENSION START
// ==============================
console.log("Phishing extension loaded");

// Get current page URL
let url = window.location.href;


// ==============================
// SHOW LOADER (UX IMPROVEMENT)
// ==============================
let loader = document.createElement("div");
loader.innerText = "🔍 Checking website safety...";
loader.style.position = "fixed";
loader.style.top = "20px";
loader.style.left = "50%";
loader.style.transform = "translateX(-50%)";
loader.style.background = "#222";
loader.style.color = "white";
loader.style.padding = "8px 12px";
loader.style.borderRadius = "8px";
loader.style.zIndex = "9999";

document.body.appendChild(loader);


// ==============================
// SEND URL TO BACKEND VIA BACKGROUND SCRIPT
// ==============================
chrome.runtime.sendMessage({ url: url }, (data) => {

  // Remove loader once response comes
  loader.remove();

  // If error from backend
  if (!data || data.error) {
    console.error("API error");
    return;
  }

  // Convert confidence to %
  let percent = (data.confidence * 100).toFixed(2);

  // Extract domain name (clean display)
  let domain = new URL(url).hostname;


  // ==============================
  // SHOW ONLY IF PHISHING (SMART UX)
  // ==============================
  if (data.prediction !== 1 || data.confidence < 0.7) {
    return; // Exit → no banner for safe sites
  }


  // ==============================
  // CREATE WARNING BANNER
  // ==============================
  let banner = document.createElement("div");

  // Positioning & layout
  banner.style.position = "fixed";
  banner.style.top = "-80px"; // start hidden (for animation)
  banner.style.left = "50%";
  banner.style.transform = "translateX(-50%)";
  banner.style.width = "90%";
  banner.style.maxWidth = "600px";
  banner.style.padding = "12px 16px";
  banner.style.zIndex = "9999";
  banner.style.borderRadius = "12px";
  banner.style.display = "flex";
  banner.style.justifyContent = "space-between";
  banner.style.alignItems = "center";

  // Styling
  banner.style.fontSize = "15px";
  banner.style.fontWeight = "500";
  banner.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  banner.style.transition = "all 0.5s ease";

  // Premium red warning style
  banner.style.background = "#ffe5e5";
  banner.style.color = "#b30000";


  // ==============================
  // MESSAGE TEXT (MAIN OUTPUT)
  // ==============================
  let message = document.createElement("span");

  message.innerText = `⚠️ ${domain} is risky
Trust Score: ${percent}%
Reason: ${data.reason}`;


  // ==============================
  // CLOSE BUTTON (❌)
  // ==============================
  let closeBtn = document.createElement("span");
  closeBtn.innerText = "✖";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.marginLeft = "15px";
  closeBtn.style.fontWeight = "bold";


  // Append elements
  banner.appendChild(message);
  banner.appendChild(closeBtn);
  document.body.appendChild(banner);


  // ==============================
  // SLIDE-DOWN ANIMATION
  // ==============================
  setTimeout(() => {
    banner.style.top = "20px";
  }, 100);


  // ==============================
  // CLOSE BUTTON FUNCTIONALITY
  // ==============================
  closeBtn.onclick = () => {
    banner.style.top = "-80px";
    setTimeout(() => banner.remove(), 500);
  };


  // ==============================
  // AUTO-HIDE AFTER 5 SECONDS
  // ==============================
  setTimeout(() => {
    banner.style.top = "-80px";
    setTimeout(() => banner.remove(), 500);
  }, 5000);

});