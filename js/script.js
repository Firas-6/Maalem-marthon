// script.js

// تأكد من تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function () {
  // تفعيل AOS (Animate On Scroll)
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // تأثير التمرير للعناصر التي تحتوي على .fade-in
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll(); // تشغيل عند التحميل أيضًا

  // زر التسجيل يفتح نافذة تسجيل
  window.registerNow = function () {
    alert("مرحبًا بك في ماراثون معالم! \nيرجى تعبئة نموذج التسجيل في الصفحة المخصصة.");
    window.location.href = "#contact"; // توجيه إلى قسم التواصل
  };

  // زر التفاصيل لكل مدينة
  window.showDetails = function (city) {
    const messages = {
      madinah: "المدينة المنورة: سباق مليء بالروحانية يمر بجوار المسجد النبوي والمعالم الإسلامية.",
      abha: "أبها: جمال الطبيعة والجبال في تجربة فريدة من نوعها لعشاق الرياضة.",
      hail: "حائل : قريبا.. ",
      AlUla: "العلا: قريبا..    ",
      Diriyah: "الدرعية: قريبا..       "
    };

    alert(messages[city] || "تفاصيل هذا السباق قيد التحديث. تابعنا!");
  };
});
