chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getSelectedTextAndLinkToHighlight") {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      sendResponse(null);
      return true;
    }

    const selectedText = selection.getRangeAt(0).toString();

    if (selectedText === "") {
      sendResponse(null);
      return true;
    }

    const firstLine = selectedText.split('\n')[0];
    const fragment = encodeURIComponent(firstLine).replace(/-/g, '%2D');
    const baseUrl = location.href.replace(/#.*$/, '');
    const linkToHighlight = baseUrl + "#:~:text=" + fragment;

    sendResponse({ selectedText: selectedText, linkToHighlight: linkToHighlight });
    return true;
  }
});