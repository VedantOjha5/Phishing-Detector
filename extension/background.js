chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.url) {
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: request.url })
    })
    .then(res => res.json())
    .then(data => sendResponse(data))
    .catch(err => {
      console.error("Background fetch error:", err);
      sendResponse({ error: "fetch failed" });
    });

    return true; // keep async response open
  }
});