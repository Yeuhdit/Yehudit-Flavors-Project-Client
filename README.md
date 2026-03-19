# 🍲 יהודית בטעמים - פרויקט מסכם (React & Node.js)

ברוכים הבאים לפרויקט "יהודית בטעמים" - אפליקציית מתכונים חכמה המאפשרת למשתמשים לגלות, לשתף ולנהל מתכונים בצורה נוחה, מעוצבת ורספונסיבית.

## 🚀 דרישות הפרויקט שיושמו במערכת:
* **ארכיטקטורה מלאה (Full Stack):** צד שרת ב-Node.js/Express וצד לקוח ב-React (Vite).
* **מסד נתונים:** שימוש ב-MongoDB (Mongoose) עם קשרי גומלין (Populate) בין 4 אוספים (Users, Recipes, Categories, Levels).
* **ניהול משתמשים והרשאות:** * אימות משתמשים עם JWT והצפנת סיסמאות בעזרת bcrypt.
  * שני סוגי הרשאות: `user` (לקוח רגיל) ו-`admin` (מנהל מערכת).
  * אזור אישי ("המתכונים שלי") ותצוגות משתנות לפי סוג המשתמש (פאנל ניהול).
* **פעולות CRUD מלאות:** יצירה, קריאה, עדכון ומחיקה של מתכונים, קטגוריות ורמות קושי.
* **טיפול בקבצים:** העלאת תמונות בצד השרת באמצעות `multer` והצגתן בצד הלקוח.
* **ניהול State גלובלי:** שימוש ב-Redux Toolkit (`createAsyncThunk`) לניהול המידע בצד הלקוח.
* **עיצוב וממשק:** * שימוש בספריית Material UI (MUI).
  * תמיכה מלאה ב-RTL (ימין לשמאל).
  * עיצוב רספונסיבי (מותאם למובייל ומחשב).
* **Middlewares מותאמים אישית:** שימוש ב-Custom Middleware Creator לתיעוד בקשות לשרת (Logger) וטיפול שגיאות גלובלי.

---

## 🛠️ טכנולוגיות מרכזיות
**צד לקוח (Frontend):** React 18, Vite, Redux Toolkit, Material UI, React Router DOM, Axios.
**צד שרת (Backend):** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), Multer, Joi.

---

## 📡 תיעוד נתיבי השרת (API Endpoints)

### 👤 משתמשים (Users)
| Method | URL | Description | Permissions |
| --- | --- | --- | --- |
| POST | `/api/users/signup` | הרשמת משתמש חדש | All |
| POST | `/api/users/signin` | התחברות לחשבון | All |
| GET | `/api/users/getAllUser` | קבלת כל המשתמשים | All |

### 🍝 מתכונים (Recipes)
| Method | URL | Description | Permissions |
| --- | --- | --- | --- |
| GET | `/api/recipes/getallrecipes` | קבלת כל המתכונים | All |
| GET | `/api/recipes/getRecipeByCode/:id`| קבלת מתכון לפי ID | All |
| GET | `/api/recipes/getRecipesByUser/:id`| קבלת מתכונים של משתמש | Logged in user |
| POST | `/api/recipes` | הוספת מתכון חדש | Logged in user |
| PUT | `/api/recipes/:id` | עדכון מתכון קיים | Owner or Admin |
| DELETE| `/api/recipes/:id` | מחיקת מתכון | Owner or Admin |

### 🏷️ קטגוריות ורמות (Categories & Levels)
| Method | URL | Description | Permissions |
| --- | --- | --- | --- |
| GET | `/api/categories/getallcategories` | קבלת כל הקטגוריות | All |
| POST | `/api/categories` | הוספת קטגוריה | Admin only |
| PUT | `/api/categories/:id` | עדכון קטגוריה | Admin only |
| DELETE| `/api/categories/:id` | מחיקת קטגוריה | Admin only |