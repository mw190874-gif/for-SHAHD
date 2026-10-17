document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('username').value.trim().toLowerCase();
  const pass = document.getElementById('password').value.trim();
  const error = document.getElementById('errorMsg');

  if ((name === 'shahd' || name === 'شهد') && pass === '1810') {
    // لو صح، بنحول لصفحة العيد
    window.location.href = 'birthday.html';
  } else {
    error.style.display = 'block';
    document.getElementById('password').value = '';
    setTimeout(() => error.style.display = 'none', 3000);
  }
});