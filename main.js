document.addEventListener('DOMContentLoaded', function () {
  var menuIcon = document.getElementById('menu-icon');
  var navUl = document.getElementById('nav-ul');

  // Toggle navigation menu visibility on menu icon click
  menuIcon.addEventListener('click', function () {
    if (navUl.style.display === 'block') {
      navUl.style.display = 'none';
    } else {
      navUl.style.display = 'block';
    }
  });

  // Handle elements with 'animate-on-scroll' class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observerForAnimation = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add class to trigger CSS animation
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
  );

  animatedElements.forEach(element => {
    observerForAnimation.observe(element); // Observe each element
  });

  // Handle typewriting effect for elements with 'introskill h4' class
  const typewriterElements = document.querySelectorAll('.introskill h4');
  typewriterElements.forEach(function (element) {
    element.classList.add('typewriter-effect');

    // Set timeout to stop the caret blink (adjust for each element if needed)
    setTimeout(function () {
      element.classList.add('typing-complete');
    }, 4000); // Adjust the timeout duration to match the typing effect duration
  });

  // Handle scroll animation for elements in the '.serv ul li' list
  const serviceItems = document.querySelectorAll('.serv ul li'); // Select all list items
  const observerForServiceItems = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { // Check if the element is in view
          entry.target.classList.add('scroll-in'); // Add class to trigger animation
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
  );

  serviceItems.forEach(item => {
    observerForServiceItems.observe(item); // Observe each list item
  });

  const skillsSection = document.getElementById("skills");
  const progressBars = document.querySelectorAll(".progress");

  function showProgress() {
    progressBars.forEach((progress) => {
      const value = progress.getAttribute("data-percentage");
      let count = 0;
      const progressText = progress.querySelector(".progress-text");
      progress.style.width = `${value}%`;

      const interval = setInterval(() => {
        if (count < value) {
          count++;
          progressText.innerText = `${count}%`;
          progressText.style.opacity = 1; // Makes text visible as it counts up
        } else {
          clearInterval(interval);
        }
      }, 15); // Adjust the speed of the counter

    });
  }

  function checkScroll() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
      showProgress();
      window.removeEventListener("scroll", checkScroll);
    }
  }

  window.addEventListener("scroll", checkScroll);

  // Handle typewriting effect for dynamic roles
  const typewriterText = document.querySelector(".typewriter-text");
  const roles = ["WEB DESIGNER", "WEB DEVELOPER", "UI/UX DESIGNER"];
  let currentIndex = 0;
  let isDeleting = false;
  let currentText = "";
  let typingSpeed = 100; // Adjust typing speed in milliseconds

  function type() {
    const fullText = roles[currentIndex];

    // Typing or deleting characters
    if (isDeleting) {
      currentText = fullText.substring(0, currentText.length - 1);
    } else {
      currentText = fullText.substring(0, currentText.length + 1);
    }

    typewriterText.textContent = currentText;

    // If the full word is typed out
    if (!isDeleting && currentText === fullText) {
      setTimeout(() => {
        isDeleting = true; // Start deleting after a pause
        setTimeout(type, 500); // Wait before deleting starts
      }, 1000); // Wait before starting to delete
    } 
    // If the word is completely deleted
    else if (isDeleting && currentText === "") {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % roles.length; // Move to the next role
      setTimeout(type, 500); // Wait before typing the next word
    } 
    // Continue typing or deleting
    else {
      const delay = isDeleting ? 50 : 150; // Adjust delay speed for deleting and typing
      setTimeout(type, delay);
    }
  }

  type(); // Start the typing effect
});
