(function() {
    async function n(c, t = false) {
      const e = document.createElement("script");
      e.src = c;
      e.async = t;
      (document.head || document.body || document.documentElement).appendChild(e);
    }
    n(window.chrome.runtime.getURL("main.js"));
  })();
  