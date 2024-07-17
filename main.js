document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    var navUl = document.getElementById('nav-ul');
    
    menuIcon.addEventListener('click', function() {
      if (navUl.style.display === 'block') {
        navUl.style.display = 'none';
      } else {
        navUl.style.display = 'block';
      }
    });
  });