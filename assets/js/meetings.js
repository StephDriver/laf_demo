// The site is only rebuilt when content changes, so "upcoming" is worked out
// at build time. This moves any meeting whose date has since passed into the
// "Past meetings" list.
(function () {
  var upcoming = document.getElementById("meetings-upcoming");
  var past = document.getElementById("meetings-past");
  if (!upcoming || !past) return;
  var today = new Date().toISOString().slice(0, 10);
  var moved = Array.prototype.filter.call(upcoming.children, function (li) {
    return li.dataset.date < today;
  });
  moved.reverse().forEach(function (li) { past.insertBefore(li, past.firstChild); });
  document.getElementById("meetings-none").hidden = upcoming.children.length > 0;
  document.getElementById("meetings-past-none").hidden = past.children.length > 0;
})();
