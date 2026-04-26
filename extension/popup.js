document.addEventListener("DOMContentLoaded", () => {
  let result = document.getElementById("result");
  result.innerText = "Checking...";

  // Get current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let url = tabs[0].url;

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
      let percent = (data.confidence * 100).toFixed(2);

      if (data.prediction === 1) {
        result.innerText = `⚠️ Phishing Website (${percent}%)`;
        result.style.color = "red";
      } else {
        result.innerText = `✅ Safe Website (${percent}%)`;
        result.style.color = "green";
      }
    })
    .catch(error => {
      result.innerText = "❌ Error connecting to API";
      result.style.color = "orange";
      console.error(error);
    });
  });
});