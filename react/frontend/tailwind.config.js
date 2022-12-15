/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
   backgroundImage:{
         "signup" :"url('https://img.freepik.com/premium-photo/book-stack-library-room-blurred-bookshelf-background_42691-514.jpg?w=2000.jpg')",
         
         "main": "url('https://unsplash.com/photos/Oz_J_FXKvIs')",
         
         "loading": "url('https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif')"
    },
    },
  },
  plugins: [],
}