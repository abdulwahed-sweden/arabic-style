# نظام الثيم العربي
## Arabic Theme Framework

نظام تصميم بسيط وأنيق للمواقع العربية مع دعم كامل لـ RTL والخطوط العربية.

## 🚀 البداية السريعة

### التحميل
```bash
git clone https://github.com/your-username/arabic-theme.git
cd arabic-theme
```

### الملفات
```
arabic-theme/
├── index.html    # الصفحة الرئيسية
├── style.css     # ملف التصميم
└── main.js       # ملف JavaScript
```

### الاستخدام
1. افتح `index.html` في المتصفح
2. ابدأ التعديل على الملفات حسب احتياجاتك

## ✨ المميزات

- 🎨 **تصميم بسيط وأنيق**
- 📱 **متجاوب مع جميع الأجهزة**
- 🔤 **دعم كامل للخطوط العربية**
- ⚡ **سرعة وأداء عالي**
- 🛠️ **سهولة التخصيص**

## 🎨 الألوان

```css
--primary: #2563eb        /* أزرق أساسي */
--secondary: #64748b      /* رمادي */
--accent: #f59e0b         /* برتقالي */
--text-primary: #1e293b   /* نص غامق */
```

## 🔧 التخصيص

### تغيير الألوان
```css
/* في ملف style.css */
:root {
  --primary: #your-color;
  --text-primary: #your-text-color;
}
```

### استخدام الخطوط
```css
.font-kufi    { font-family: var(--font-kufi); }     /* للعناوين */
.font-naskh   { font-family: var(--font-naskh); }    /* للمحتوى */
.font-tajawal { font-family: var(--font-tajawal); }  /* للواجهة */
```

## 🧩 المكونات الأساسية

### الأزرار
```html
<button class="btn btn-primary">زر أساسي</button>
<button class="btn btn-outline">زر مفرغ</button>
```

### البطاقات
```html
<div class="card">
  <div class="card-header">
    <h5>العنوان</h5>
  </div>
  <div class="card-body">
    <p>المحتوى</p>
  </div>
</div>
```

### النماذج
```html
<form>
  <div class="mb-3">
    <label class="form-label">الاسم <span class="required">*</span></label>
    <input type="text" class="form-control" required>
  </div>
  <button type="submit" class="btn btn-primary">إرسال</button>
</form>
```

## 📚 أمثلة عملية

### صفحة بسيطة
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقعي</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>مرحباً بكم</h1>
        <p>هذا موقع عربي جميل</p>
        <button class="btn btn-primary">ابدأ الآن</button>
    </div>
    <script src="main.js"></script>
</body>
</html>
```

## 🛠️ JavaScript API

### الوظائف المتاحة
```javascript
// عرض رسالة
ArabicTheme.showAlert('تم الحفظ بنجاح!', 'success');

// تحويل الأرقام للعربية
ArabicTheme.utils.toArabicNumbers('123'); // ١٢٣

// تحويل التاريخ للعربية
ArabicTheme.utils.formatArabicDate(new Date()); // ١ يناير ٢٠٢٤
```
