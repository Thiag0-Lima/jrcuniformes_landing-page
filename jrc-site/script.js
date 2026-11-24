(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hdr = document.getElementById("top");
  var thread = document.getElementById("thread");
  var veil = document.getElementById("veil");
  var vid = document.querySelector("#bgv");

  document.getElementById("yr").textContent = new Date().getFullYear();

  var ticking = false;

  function update() {
    var y = window.scrollY;
    var h = window.innerHeight;
    var max = document.documentElement.scrollHeight - h;
    var p = max > 0 ? Math.min(1, y / max) : 0;
    var hero = Math.min(1, y / h);

    thread.style.setProperty("--p", p * 100 + "%");
    hdr.classList.toggle("solid", y > 40);
    veil.style.opacity = (0.25 + hero * 0.6).toFixed(3);

    if (!reduce) {
      vid.style.transform = "scale(" + (1.04 + hero * 0.1).toFixed(3) + ")";
      vid.style.filter = "blur(" + (hero * 4).toFixed(1) + "px)";
    }

    ticking = false;
  }

  addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  addEventListener("resize", update);
  update();

  var lis = document.querySelectorAll(".points li");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          e.target.classList.toggle("on", e.isIntersecting);
        });
      },
      { rootMargin: "-30% 0px -30% 0px" },
    );

    lis.forEach(function (l) {
      io.observe(l);
    });
  } else {
    lis.forEach(function (l) {
      l.classList.add("on");
    });
  }

  var p = vid.play && vid.play();

  if (p && p.catch) {
    p.catch(function () {});
  }
})();
