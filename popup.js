document.addEventListener("DOMContentLoaded", function () {
  const linkToHighlightAnchor = document.getElementById("linkToHighlight");
  const noSelectionMsg = document.getElementById("noSelectionMsg");
  const noteEl = document.getElementById("note");

  // Canonical selection state — avoids reading .href off a DOM anchor, which
  // resolves "" to the document base URL instead of returning empty string.
  let currentSelection = null;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Small delay so the content script's message listener is registered
    // before we query it (matters on freshly loaded tabs).
    setTimeout(function () {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getSelectedTextAndLinkToHighlight" },
        function (response) {
          if (chrome.runtime.lastError) {
            noSelectionMsg.textContent = "Could not connect to page. Try reloading.";
            return;
          }
          if (response && response.linkToHighlight) {
            currentSelection = { link: response.linkToHighlight, text: response.selectedText };
            linkToHighlightAnchor.href = response.linkToHighlight;
            linkToHighlightAnchor.textContent = response.selectedText;
            noSelectionMsg.textContent = "";
          } else {
            currentSelection = null;
            linkToHighlightAnchor.removeAttribute("href");
            linkToHighlightAnchor.textContent = "";
            noSelectionMsg.textContent = "No text selected. Highlight text on the page first.";
          }
        }
      );
    }, 100);
  });

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function () {
    if (!currentSelection) {
      alert("No text selected. Highlight text on the page before saving.");
      return;
    }

    const { link, text } = currentSelection;

    chrome.storage.sync.get({ lazyLinkSaver: [] }, function (result) {
      const newEntry = { link: link, text: text, note: noteEl.value };
      const updatedList = result.lazyLinkSaver.concat([newEntry]);

      const byteSize = new TextEncoder().encode(JSON.stringify(updatedList)).length;
      if (byteSize > chrome.storage.sync.QUOTA_BYTES_PER_ITEM) {
        alert("Storage quota exceeded. Export and clear some entries to free up space.");
        return;
      }

      chrome.storage.sync.set({ lazyLinkSaver: updatedList }, function () {
        if (chrome.runtime.lastError) {
          alert("Failed to save: " + chrome.runtime.lastError.message);
        } else {
          alert("Entry saved successfully!");
        }
      });
    });
  });

  const manageButton = document.getElementById("manageButton");
  manageButton.addEventListener("click", function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("manage.html") });
  });
});