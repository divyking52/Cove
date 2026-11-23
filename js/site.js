(function () {
  var CONFIG = {
    whatsapp: "0000000000",
    email: "hello@yourcompany.com",
    phone: "+00 000 000 0000"
  };

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var wa = document.getElementById("waBtn");
  if (wa) {
    wa.href =
      "https://wa.me/" +
      CONFIG.whatsapp.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent("Hello Cove Collective — I would like to plan an experience.");
  }

  var burger = document.getElementById("burger");
  var mobile = document.getElementById("mobileMenu");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      mobile.classList.toggle("open");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
      });
    });
  }

  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      function () {
        nav.classList.toggle("scrolled", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  var FORM_HTML =
    '<div class="success" data-ok>Enquiry received locally. Connect this form to your inbox or CRM to go live. We have not sent anything yet.</div>' +
    '<form novalidate>' +
    '<div class="form-grid">' +
    '<div class="field"><label>Full name</label><input name="name" autocomplete="name" required><span class="error">Please add your name.</span></div>' +
    '<div class="field"><label>Business email</label><input type="email" name="email" autocomplete="email" required><span class="error">Use a valid email.</span></div>' +
    '<div class="field"><label>Phone</label><input type="tel" name="phone" autocomplete="tel" inputmode="tel" required><span class="error">Add a phone number.</span></div>' +
    '<div class="field"><label>Type of event</label>' +
    '<select name="type" required>' +
    '<option value="">Select</option>' +
    "<option>Concert Travel</option>" +
    "<option>Corporate Meetings</option>" +
    "<option>Conferences</option>" +
    "<option>Incentive Travel</option>" +
    "<option>Exhibitions & Trade Shows</option>" +
    "<option>Group Travel</option>" +
    '</select><span class="error">Choose an event type.</span></div>' +
    '<div class="field"><label>Preferred destination</label><input name="destination" placeholder="City or region"><span class="error"></span></div>' +
    '<div class="field"><label>Event date</label><input type="date" name="date"><span class="error"></span></div>' +
    '<div class="field"><label>Number of attendees</label><input type="number" name="attendees" min="1" inputmode="numeric"><span class="error"></span></div>' +
    '<div class="field full"><label>Additional requirements</label><textarea name="message"></textarea></div>' +
    "</div>" +
    '<button class="btn btn-primary" type="submit" style="margin-top:16px">Send enquiry</button>' +
    "</form>";

  function bindForm(form, ok) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll(".field").forEach(function (f) {
        f.classList.remove("invalid");
      });
      var name = form.elements.namedItem("name");
      var email = form.elements.namedItem("email");
      var phone = form.elements.namedItem("phone");
      var type = form.elements.namedItem("type");
      if (!name.value.trim()) {
        name.closest(".field").classList.add("invalid");
        valid = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.closest(".field").classList.add("invalid");
        valid = false;
      }
      if (!phone.value.trim()) {
        phone.closest(".field").classList.add("invalid");
        valid = false;
      }
      if (!type.value) {
        type.closest(".field").classList.add("invalid");
        valid = false;
      }
      if (!valid) return;
      ok.classList.add("show");
      form.reset();
    });
  }

  document.querySelectorAll("[data-form]").forEach(function (box) {
    box.innerHTML = FORM_HTML;
    var preset = {
      concert: "Concert Travel",
      meetings: "Corporate Meetings",
      incentive: "Incentive Travel",
      exhibitions: "Exhibitions & Trade Shows"
    }[box.getAttribute("data-form")];
    if (preset) box.querySelector("select[name=type]").value = preset;
    bindForm(box.querySelector("form"), box.querySelector("[data-ok]"));
  });

  var news = document.getElementById("newsForm");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = this.email;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.setAttribute("aria-invalid", "true");
        return;
      }
      var ok = document.getElementById("newsOk");
      if (ok) ok.classList.add("show");
      this.reset();
    });
  }

  var panel = document.getElementById("enquirePanel");
  function setPanel(open) {
    if (!panel) return;
    panel.classList.toggle("open", open);
  }
  document.querySelectorAll("[data-open-enquire]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ev = btn.getAttribute("data-event");
      setPanel(!panel.classList.contains("open"));
      if (ev) {
        var sel = panel.querySelector("select[name=type]");
        if (sel) sel.value = ev;
      }
    });
  });
  var enquireClose = document.getElementById("enquireClose");
  if (enquireClose) {
    enquireClose.addEventListener("click", function () {
      setPanel(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setPanel(false);
  });

  document.querySelectorAll("img").forEach(function (img, i) {
    if (i > 1) img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", function () {
      img.style.background = "linear-gradient(145deg, #E6E3DC, #141311 70%)";
      img.style.objectFit = "cover";
    });
  });
})();
