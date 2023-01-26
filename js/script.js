console.log("Hello world!");

const myName = "Reese S.";
const h1 = document.querySelector(".heading-primary");

console.log(myName);
console.log(h1);

// FUNCTIONS ( e.g. addEventListener() ) are reusable pieces of code that we can define somewhere else & then use them
// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

///////////////////////////////
// 139. SET CURRENT YEAR
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////
// 140. MAKE MOBILE NAVIGATION WORK
const btnNav = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNav.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////
// 141.
// SMOOTH SCROLLING ANIMATION

const allLinks = document.querySelectorAll("a:link");
console.log(allLinks);
// "allLinks" consists of multiple elements; we need to specify that all the elements in "allLinks" is a 'link' (or any other name for that matter)
allLinks.forEach(function (link) {
  // (e) stands for 'event' bec we have access to the event that happens
  link.addEventListener("click", function (e) {
    // whenever we click on a link, we will get the event obj locked on the console
    // console.log(e);
    e.preventDefault();
    // must specifically be 'href' for getAttribute; whenever any of the links are clicked it will show the specific href attribute in the console
    const href = link.getAttribute("href");
    // console.log(href);

    // SCROLL BACK TO TOP
    // this will allow smooth scrolling to the topmost part of the page wnenever the omnifood logo is clicked; this does not work by default in safari but there is a way to fix this by using the 'polyfill'
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // SCROLL TO OTHER LINKS
    if (href !== "#" && href.startsWith("#")) {
      // when a link is clicked, it will lock it to the console (ex: #cta)bec it starts w/ a '#' & consists of more than 1 character
      // console.log(href);
      const sectionEl = document.querySelector(href);
      // 'How it works' link is clicked; element that has the id eq to the href of what has been selected & now locked in console;
      // <section class="section-how" id="how">
      // ..........
      // </section>
      // console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // CLOSE MOBILE NAVIGATION
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// STICKY NAVIGATION
// as soon as the .section-hero moves out of the viewport, that is when the navigation will start to become sticky

// 1=> .section-hero is the element we want to observe
const sectionHeroEl = document.querySelector(".section-hero");
// 4=> we now have access to an array of entries; we only have 1 entry though
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      // .sticky is added to the body as soon as we move out of the .section-hero
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // 2=>this will allow us to observe .section-hero as it moves inside the viewport
    root: null,
    // 3=> '0' means we will have like an event as soon as there is 0% of .section-hero in the viewport (or as soon as it moves out of the viewport); if set to '1', we will have the event if .section-hero is completely inside the viewport
    threshold: 0,
    // applied outside of root, after moving out of the .section-hero; must be a string & in px, eq to height (8rem) set in .sticky .header
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

// hack: if a certain browser does not support the flexbox property, it will add the "no-flexbox-gap" to the body; always add this code to future projects
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// ===> this code can be added in html as a script(polyfill ==> a js library w/c implements this functionality in safari (smooth scrolling)
// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*   ==> CSS code ---> copy & paste at the end of queries.css
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
