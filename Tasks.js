Phase 2: Backend - Node.js
A. إعداد السيرفر:
 إنشاء سيرفر باستخدام http module.

 إعداد Routing يدوي (GET, POST, PUT, DELETE).

 إعداد static file serving للـ frontend.

B. قاعدة البيانات (ممكن تبدأ ب JSON أو MongoDB لو حبيت):
 إعداد قاعدة بيانات للـ Products.

 إعداد قاعدة بيانات للـ Users.

 إعداد قاعدة بيانات للـ Orders.

C. APIs:
 GET /products → يعرض كل المنتجات.

 GET /product/:id → تفاصيل منتج.

 POST /cart → إضافة منتج للسلة.

 POST /order → إنشاء طلب.

 POST /auth/signup و /auth/login.



let products =[,{
    _id= String,
    desc= String,
    img = url ,
    Price = Number,
    Title = String,
    Seller = String
 },,,,]
 
//   Example ( you can use this data for the frontEnd)
//
//
 products = [
  {
    _id: "1",
    title: "Wireless Headphones",
    description: "High quality sound with noise cancellation.",
    img: "https://example.com/images/headphones.jpg",
    price: 1200,
    seller: "TechWorld"
  },
  {
    _id: "2",
    title: "Smart Watch",
    description: "Waterproof fitness watch with heart rate monitor.",
    img: "https://example.com/images/smartwatch.jpg",
    price: 950,
    seller: "GadgetZone"
  },
  {
    _id: "3",
    title: "Bluetooth Speaker",
    description: "Portable speaker with deep bass.",
    img: "https://example.com/images/speaker.jpg",
    price: 500,
    seller: "SoundHub"
  },
  {
    _id: "4",
    title: "Gaming Mouse",
    description: "RGB mouse with high DPI and programmable buttons.",
    img: "https://example.com/images/mouse.jpg",
    price: 350,
    seller: "ProGamer"
  },
  {
    _id: "5",
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better posture.",
    img: "https://example.com/images/laptop-stand.jpg",
    price: 250,
    seller: "OfficeStuff"
  }
];



 User=[,,{
    userName = String,
    Password = ##################,
    userLevel = [user, SuperUser],
    cart = [_id,,,,]
 },,,]



 Phase 3: Frontend - Vanilla JS + HTML/CSS
A. الصفحات الأساسية:
 - الصفحة الرئيسية (Home): عرض المنتجات.

 - صفحة تفاصيل المنتج (Product Details).

 - صفحة السلة (Cart).

 - صفحة تسجيل الدخول/تسجيل حساب.

 - صفحة الدفع (Checkout).

B. الوظائف:
 - عرض المنتجات من خلال API.

 - إضافة المنتجات للسلة وتخزينها.

 - تسجيل الدخول وتخزين التوكن (لو هتستخدم JWT).

 - تنفيذ عملية الطلب والدفع التجريبي.

🛠️ Phase 4: Admin Dashboard
A. لوحة التحكم:
 - صفحة دخول للإدمن فقط.

 - عرض كل المنتجات مع إمكانية الإضافة / التعديل / الحذف.

 - عرض الطلبات وحالتها (تم - جاري التنفيذ - تم التوصيل).

 - عرض بيانات المستخدمين.

 - صفحة رفع صورة المنتج (اختياري).

 - إضافة صلاحيات (Admin vs User).

B. Backend APIs للإدمن:
 - POST /admin/product → إضافة منتج.

 - PUT /admin/product/:id → تعديل منتج.

 - DELETE /admin/product/:id → حذف منتج.

 - GET /admin/orders → عرض كل الطلبات.

 - GET /admin/users → عرض كل المستخدمين.

