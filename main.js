/*!
 * Arabic Theme Framework v1.0.0 - JavaScript
 * إطار عمل شامل للمواقع العربية
 * Copyright (c) 2024 Abdulwahed
 * Licensed under MIT License
 */

(function() {
    'use strict';

    // إعدادات النظام
    const ArabicTheme = {
        // إعدادات افتراضية
        settings: {
            enableSmoothScroll: true,
            enableAnimations: true,
            enableFormValidation: true,
            scrollOffset: 70,
            animationDuration: 200
        },

        // تهيئة النظام
        init: function() {
            this.initSmoothScroll();
            this.initAnimations();
            this.initNavbar();
            this.initFormValidation();
            this.initUtils();
            
            console.log('🎉 تم تحميل نظام الثيم العربي بنجاح');
        },

        // تمرير سلس للروابط
        initSmoothScroll: function() {
            if (!this.settings.enableSmoothScroll) return;

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - this.settings.scrollOffset;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        // الرسوم المتحركة
        initAnimations: function() {
            if (!this.settings.enableAnimations) return;

            // تأثيرات الأزرار
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    if (!this.disabled) {
                        this.style.transform = 'translateY(-2px)';
                    }
                });

                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });

                button.addEventListener('mousedown', function() {
                    if (!this.disabled) {
                        this.style.transform = 'translateY(0) scale(0.98)';
                    }
                });

                button.addEventListener('mouseup', function() {
                    if (!this.disabled) {
                        this.style.transform = 'translateY(-2px) scale(1)';
                    }
                });
            });

            // تأثيرات البطاقات
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.boxShadow = 'var(--shadow-lg)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.boxShadow = 'var(--shadow-sm)';
                });
            });

            // تأثيرات صناديق المميزات
            this.initScrollAnimations();
        },

        // رسوم متحركة عند التمرير
        initScrollAnimations: function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // تطبيق التأثير على العناصر
            document.querySelectorAll('.feature-box, .card').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        },

        // شريط التنقل
        initNavbar: function() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            // تأثير الخلفية عند التمرير
            let lastScrollY = window.scrollY;
            
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = 'var(--shadow)';
                } else {
                    navbar.style.backgroundColor = 'var(--bg-primary)';
                    navbar.style.backdropFilter = 'none';
                    navbar.style.boxShadow = 'none';
                }

                lastScrollY = currentScrollY;
            });

            // إغلاق القائمة عند النقر على رابط (للجوال)
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                });
            });
        },

        // التحقق من النماذج
        initFormValidation: function() {
            if (!this.settings.enableFormValidation) return;

            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!this.validateForm(form)) {
                        e.preventDefault();
                        this.showAlert('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'error');
                    } else {
                        e.preventDefault(); // منع الإرسال الفعلي للعرض
                        this.showAlert('تم إرسال النموذج بنجاح!', 'success');
                        form.reset();
                    }
                });

                // التحقق الفوري
                form.querySelectorAll('input, textarea').forEach(field => {
                    field.addEventListener('blur', () => {
                        this.validateField(field);
                    });

                    field.addEventListener('input', () => {
                        this.clearFieldError(field);
                    });
                });
            });
        },

        // التحقق من حقل واحد
        validateField: function(field) {
            const value = field.value.trim();
            const isRequired = field.hasAttribute('required');
            const type = field.type;

            this.clearFieldError(field);

            let isValid = true;
            let errorMessage = '';

            if (isRequired && !value) {
                isValid = false;
                errorMessage = 'هذا الحقل مطلوب';
            } else if (type === 'email' && value && !this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
            }

            if (!isValid) {
                this.showFieldError(field, errorMessage);
            }

            return isValid;
        },

        // التحقق من النموذج كاملاً
        validateForm: function(form) {
            let isFormValid = true;
            const requiredFields = form.querySelectorAll('input[required], textarea[required]');

            requiredFields.forEach(field => {
                if (!this.validateField(field)) {
                    isFormValid = false;
                }
            });

            return isFormValid;
        },

        // عرض خطأ الحقل
        showFieldError: function(field, message) {
            field.style.borderColor = '#ef4444';
            
            let errorDiv = field.parentNode.querySelector('.field-error');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
                field.parentNode.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
        },

        // مسح خطأ الحقل
        clearFieldError: function(field) {
            field.style.borderColor = '';
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        },

        // التحقق من صحة البريد الإلكتروني
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // وظائف مساعدة
        initUtils: function() {
            // تحسين الأداء للأزرار
            document.querySelectorAll('.btn').forEach(button => {
                button.style.willChange = 'transform';
            });

            // تحسين التركيز للوصولية
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('using-keyboard');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('using-keyboard');
            });

            // إضافة CSS للتركيز
            const style = document.createElement('style');
            style.textContent = `
                .using-keyboard *:focus {
                    outline: 2px solid var(--primary) !important;
                    outline-offset: 2px !important;
                }
                
                .field-error {
                    animation: shake 0.3s ease-in-out;
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .alert {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    min-width: 300px;
                    padding: 1rem 1.5rem;
                    border-radius: var(--border-radius);
                    font-family: var(--font-tajawal);
                    font-weight: var(--font-weight-medium);
                    box-shadow: var(--shadow-lg);
                    animation: slideIn 0.3s ease-out;
                }
                
                .alert-success {
                    background-color: #22c55e;
                    color: white;
                }
                
                .alert-error {
                    background-color: #ef4444;
                    color: white;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        },

        // عرض رسالة تنبيه
        showAlert: function(message, type = 'success', duration = 4000) {
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.textContent = message;

            document.body.appendChild(alert);

            // إزالة تلقائية مع تأثير
            setTimeout(() => {
                alert.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove();
                    }
                }, 300);
            }, duration);
        },

        // وظائف مساعدة إضافية
        utils: {
            // تحويل التاريخ للعربية
            formatArabicDate: function(date) {
                const arabicMonths = [
                    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
                ];
                
                const d = new Date(date);
                return `${d.getDate()} ${arabicMonths[d.getMonth()]} ${d.getFullYear()}`;
            },

            // تحويل الأرقام للعربية
            toArabicNumbers: function(str) {
                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                return str.toString().replace(/\d/g, (d) => arabicNumbers[d]);
            },

            // تحويل الأرقام للإنجليزية
            toEnglishNumbers: function(str) {
                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                let result = str.toString();
                arabicNumbers.forEach((arabic, index) => {
                    result = result.replace(new RegExp(arabic, 'g'), index);
                });
                return result;
            },

            // التمرير لعنصر معين
            scrollToElement: function(selector, offset = 70) {
                const element = document.querySelector(selector);
                if (element) {
                    const top = element.offsetTop - offset;
                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };

    // تصدير للاستخدام العالمي
    window.ArabicTheme = ArabicTheme;

    // تهيئة تلقائية عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        ArabicTheme.init();
    });

    // تحسين الأداء
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // يمكن إضافة service worker هنا إذا لزم الأمر
        });
    }

})();