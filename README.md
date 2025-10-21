BYU-Pathway Worldwide Online
WDD 330 - Web Frontend Development II
⛺ SleepOutside Example Solution
W03 Team Activity: Dynamic Header and Footer

https://byui-cse.github.io/wdd330-ww-course/week05/index.html


…Or create a new repository on the command line
echo "# wdd330-jobboard-project-webapp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/iriebijudicael/wdd330-jobboard-project-webapp.git
git push -u origin main

git remote add origin https://github.com/iriebijudicael/wdd330-jobboard-project-webapp.git
git branch -M main
git push -u origin main


Prerequisites
You must have Node installed to run the following commands. WDD 330 Setup Environment
Common Workflow Commands
npm run lint to run ESLint against your code to find errors.
npm run format to run Prettier to automatically format your code.
npm run start starts up a local server and updates on any JS or CSS/SCSS
npm run build to build final files when you are ready to turn in.



RAPID_API_KEY = 'f4d5096a6amsh22d9b06fb71fdf9p1fff95jsn14e7fe135821';
API_URL = 'https://linkedin-jobs-search.p.rapidapi.com/';



.grid {
  display: grid;
  align-items: center;
}
    
main {
  grid-column: 2/3;
  margin: 1rem;
}
    
aside {
  width: 20rem;
  position: relative;
  grid-column: 1/2;
  grid-row: 1/2;
}
