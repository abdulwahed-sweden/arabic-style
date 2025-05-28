/*!
 * Arabic Theme Framework - Bootstrap Version JavaScript
 * إطار عمل شامل للمواقع العربية مع Bootstrap
 * Copyright (c) 2024 Abdulwahed
 * Licensed under MIT License
 */

(function() {
    'use strict';

    // إعدادات النظام
    const ArabicThemeBootstrap = {
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
            this.initScrollAnimations();
            
            console.log('🎉 تم تحميل نظام الثيم العربي - نسخة Bootstrap');
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
                    if (!this.disabled && !this.classList.contains('disabled')) {
                        this.style.transform = 'translateY(-2px)';
                        this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                    }
                });

                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                });

                button.addEventListener('mousedown', function() {
                    if (!this.disabled && !this.classList.contains('disabled')) {
                        this.style.transform = 'translateY(0) scale(0.98)';
                    }
                });

                button.addEventListener('mouseup', function() {
                    if (!this.disabled && !this.classList.contains('disabled')) {
                        this.style.transform = 'translateY(-2px) scale(1)';
                    }
                });
            });

            // تأثيرات البطاقات
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                });
            });
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
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.scroll-fade').forEach(element => {
                observer.observe(element);
            });
        },

        // شريط التنقل
        initNavbar: function() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            // تأثير الخلفية عند التمرير
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(15px)';
                } else {
                    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    navbar.style.backdropFilter = 'blur(10px)';
                }
            });

            // معالجة القائمة المتنقلة
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

            if (navbarToggler && navbarCollapse) {
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                            navbarToggler.click();
                        }
                    });
                });
            }
        },

        // التحقق من النماذج
        initFormValidation: function() {
            if (!this.settings.enableFormValidation) return;

            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!this.validateForm(form)) {
                        e.preventDefault();
                        this.showAlert('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'danger');
                    } else {
                        e.preventDefault(); // منع الإرسال الفعلي للعرض
                        this.showAlert('تم إرسال النموذج بنجاح!', 'success');
                        form.reset();
                        // إزالة فئات التحقق
                        form.querySelectorAll('.is-invalid').forEach(field => {
                            field.classList.remove('is-invalid');
                        });
                    }
                });

                // التحقق الفوري
                form.querySelectorAll('input, textarea').forEach(field => {
                    field.addEventListener('blur', () => {
                        this.validateField(field);
                    });

                    field.addEventListener('input', () => {
                        if (field.classList.contains('is-invalid')) {
                            field.classList.remove('is-invalid');
                        }
                    });
                });
            });
        },

        // التحقق من حقل واحد
        validateField: function(field) {
            const value = field.value.trim();
            const isRequired = field.hasAttribute('required');
            const type = field.type;

            let isValid = true;

            if (isRequired && !value) {
                isValid = false;
            } else if (type === 'email' && value && !this.isValidEmail(value)) {
                isValid = false;
            }

            if (!isValid) {
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
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

        // التحقق من صحة البريد الإلكتروني
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // عرض رسائل التنبيه باستخدام Bootstrap
        showAlert: function(message, type = 'success', duration = 4000) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
            alertDiv.style.zIndex = '9999';
            alertDiv.style.minWidth = '300px';
            
            const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
            
            alertDiv.innerHTML = `
                <i class="${icon} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
            `;

            document.body.appendChild(alertDiv);

            // إزالة تلقائية
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, duration);
        },

        // وظائف مساعدة
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
            },

            // إضافة فئة بتأخير
            addClassWithDelay: function(element, className, delay = 100) {
                setTimeout(() => {
                    if (element) {
                        element.classList.add(className);
                    }
                }, delay);
            }
        }
    };

    // تصدير للاستخدام العالمي
    window.ArabicThemeBootstrap = ArabicThemeBootstrap;

    // تهيئة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        ArabicThemeBootstrap.init();
        
        // إضافة تأثيرات إضافية
        setTimeout(() => {
            document.querySelectorAll('.animate-scale-in').forEach((element, index) => {
                ArabicThemeBootstrap.utils.addClassWithDelay(element, 'animate-scale-in', index * 100);
            });
        }, 500);
    });

    // تحسين الأداء
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // يمكن إضافة service worker هنا إذا لزم الأمر
        });
    }

})();