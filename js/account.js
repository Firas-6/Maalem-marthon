// --- 1. Navigation Menu Toggle (مثال بسيط لقائمة تنقل قابلة للطي) ---
/*
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle-button');
    const navMenu = document.querySelector('.main-nav ul');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
*/

// --- 2. Button Click Handlers (معالجة النقر على الأزرار) ---
document.addEventListener('DOMContentLoaded', () => {
    // زر تسجيل الخروج
    const logoutButton = document.querySelector('.btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            const confirmLogout = confirm('هل أنت متأكد من أنك تريد تسجيل الخروج؟');
            if (confirmLogout) {
                alert('جاري تسجيل الخروج...');
                // window.location.href = '/logout-page'; // مثال لإعادة التوجيه
            }
        });
    }

    // زر إتمام عملية الدفع
    const completePaymentButton = document.querySelector('.btn-primary');
    if (completePaymentButton) {
        completePaymentButton.addEventListener('click', (event) => {
            event.preventDefault();
            alert('تم النقر على زر "إتمام عملية الدفع".');
            // console.log('Initiating payment process...');
        });
    }

    // زر إلغاء الاشتراك
    const cancelSubscriptionButton = document.querySelector('.btn-danger');
    if (cancelSubscriptionButton) {
        cancelSubscriptionButton.addEventListener('click', (event) => {
            event.preventDefault();
            const confirmCancel = confirm('هل أنت متأكد من أنك تريد إلغاء الاشتراك؟ لا يمكن التراجع عن هذا الإجراء.');
            if (confirmCancel) {
                alert('جاري إلغاء اشتراكك...');
                // console.log('Cancelling subscription...');
            }
        });
    }

    // زر إضافة مشترك جديد
    const addSubscriberButton = document.querySelector('.add-subscriber-btn');
    if (addSubscriberButton) {
        addSubscriberButton.addEventListener('click', (event) => {
            event.preventDefault();
            alert('تم النقر على زر "إضافة مشترك جديد".');
            // window.location.href = '/add-subscriber'; // مثال لإعادة التوجيه
        });
    }
});

// --- 3. Dynamic Weather Update (تحديث بيانات الطقس ديناميكيًا) ---
async function fetchWeatherData(city = 'Abha') {
    // استخدم مفتاح API الخاص بك من خدمة مثل OpenWeatherMap
    const apiKey = 'YOUR_API_KEY'; // !! استبدل هذا بمفتاح API الخاص بك !!
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ar`;

    
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('Abha');
    // setInterval(() => fetchWeatherData('Abha'), 600000);
});