FIXED VERSION NOTES

This version uses localStorage for the cart to avoid backend cart/session errors.

Important:
1. Put the project folder inside htdocs with the exact name: catering-project
2. Run the SQL file: database.sql
3. Update backend/config/database.php if your MySQL password is different
4. Menu item images must be placed in backend/uploads/
5. In admin dashboard image field, write only the file name, for example: baklava.jpg
6. Home background image is in frontend/src/assets/hero.jpg
7. Logo image is in frontend/src/assets/logo.png

Run:
cd frontend
npm install
npm start
