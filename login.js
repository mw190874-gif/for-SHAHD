document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nameInput = document.getElementById('username').value.trim().toLowerCase();
  const passInput = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const loginCard = document.getElementById('loginCard');

  // التحقق من الاسم والباسورد
  if ((nameInput === 'shahd' || nameInput === 'شهد') && passInput === '1810') {
    errorMsg.style.display = 'none';
    
    // تغيير شكل الزرار لعلامة صح
    const btn = document.querySelector('.btn-login');
    btn.innerHTML = '<span>تم الدخول ✅</span>';
    btn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
    btn.style.color = '#fff';
    
    // الانتقال لصفحة عيد الميلاد بعد ثانية
    setTimeout(() => {
      window.location.href = 'birthday.html'; // تأكد أن صفحة العيد اسمها birthday.html
    }, 1000);

  } else {
    // لو البيانات غلط
    errorMsg.style.display = 'block';
    loginCard.classList.add('shake');
    
    // مسح الباسورد
    document.getElementById('password').value = '';

    // شيل تأثير الاهتزاز بعد ما يخلص عشان يشتغل تاني
    setTimeout(() => {
      loginCard.classList.remove('shake');
    }, 500);
  }
});