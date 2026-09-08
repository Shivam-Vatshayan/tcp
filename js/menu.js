/* ============================================
   MENU.JS — category tab navigation
   ============================================ */

(function () {
  "use strict";

  var tabs = document.querySelectorAll(".menu-tab");
  var categories = document.querySelectorAll(".menu-category");

  if (!tabs.length || !categories.length) return;

  function setActiveTab(id) {
    tabs.forEach(function (tab) {
      tab.classList.toggle("active", tab.getAttribute("data-target") === id);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = tab.getAttribute("data-target");
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        var headerOffset = 150;
        var top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: top, behavior: "smooth" });
        setActiveTab(targetId);
      }
    });
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: 0 }
    );
    categories.forEach(function (cat) { observer.observe(cat); });
  }
})();
