// 1. ميزة التحكم في حجم الخط (عالمية - Global)
let currentFontSize = 100; 

function changeFontSize(action) {
    const body = document.body;
    
    if (action === 'increase') {
        if (currentFontSize < 140) { 
            currentFontSize += 10;
        }
    } else if (action === 'decrease') {
        if (currentFontSize > 90) { 
            currentFontSize -= 10;
        }
    }
    
    body.style.fontSize = currentFontSize + '%';
}

// 2. ميزة النمط الليلي (Dark Mode)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // حفظ التفضيلات في المتصفح
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 3. ميزة تبديل اللغة (تغيير الاتجاه والنصوص الأساسية)
function switchLanguage(lang) {
    const html = document.documentElement;
    
    if (lang === 'en') {
        html.lang = "en";
        html.dir = "ltr";
        translateNavbar('en');
    } else {
        html.lang = "ar";
        html.dir = "rtl";
        translateNavbar('ar');
    }
    
    // حفظ اختيار اللغة
    localStorage.setItem('preferredLang', lang);
}

// دالة مساعدة لترجمة القائمة العلوية فوراً
function translateNavbar(lang) {
    const links = document.querySelectorAll('.nav-links a');
    const translations = {
        'en': ['Home', 'About', 'Facilities', 'Packages', 'Contact'],
        'ar': ['الرئيسية', 'عن الفندق', 'المرافق', 'الحزم والأسعار', 'اتصل بنا']
    };

    links.forEach((link, index) => {
        if (translations[lang][index]) {
            link.innerText = translations[lang][index];
        }
    });
}

// 4. الأكواد التي تعمل بعد تحميل عناصر الصفحة
document.addEventListener('DOMContentLoaded', () => {

    // استرجاع النمط المفضل (ليلي/نهاري)
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // استرجاع اللغة المفضلة
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    switchLanguage(savedLang);

    // التحقق من نموذج الاتصال (Contact Form)
    const contactForm = document.getElementById('petContactForm');
    const feedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (name === "" || email === "") {
                showFeedback("يرجى تعبئة الحقول المطلوبة ⚠️", "error");
            } else {
                showFeedback(`شكراً لك يا ${name}! تم استلام طلبك بنجاح 🐾`, "success");
                contactForm.reset();
            }
        });
    }

    function showFeedback(text, type) {
        if (feedback) {
            feedback.innerText = text;
            feedback.style.display = "block";
            feedback.style.padding = "15px";
            feedback.style.marginTop = "15px";
            feedback.style.borderRadius = "8px";
            feedback.style.textAlign = "center";
            feedback.style.fontWeight = "bold";

            if (type === "success") {
                feedback.style.backgroundColor = "#d4edda";
                feedback.style.color = "#155724";
            } else {
                feedback.style.backgroundColor = "#f8d7da";
                feedback.style.color = "#721c24";
            }
        }
    }

    // 5. تأثيرات ظهور البطاقات عند التمرير (Scroll Reveal)
    const cards = document.querySelectorAll('.service-box, .package-card, .service-card, .card, .activity-item, .custom-card');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    console.log("Loving Homes JS Fully Optimized! 🐾");
});