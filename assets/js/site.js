// Links between pages can be written as "background.md" (the file name, which
// also works when previewing on GitHub). On the site these become ".html".
(function () {
  "use strict";
  document.querySelectorAll('main a[href$=".md"], main a[href*=".md#"]').forEach(function (a) {
    var href = a.getAttribute("href");
    if (/^[a-z]+:/i.test(href)) return;
    a.setAttribute("href", href.replace(/\.md(#|$)/, ".html$1"));
  });
})();

// Links written in content as "/about/" assume the site is at the root of its
// domain. While the site is served from a sub-folder (e.g. username.github.io/repo/),
// this adds the folder to those links. It does nothing on a custom domain.
(function () {
  "use strict";
  var base = document.documentElement.dataset.baseurl || "";
  if (!base) return;
  document.querySelectorAll('main a[href^="/"]:not([href^="//"])').forEach(function (a) {
    var href = a.getAttribute("href");
    if (href !== base && href.indexOf(base + "/") !== 0) a.setAttribute("href", base + href);
  });
})();
