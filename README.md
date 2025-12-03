Lost & Found
============

Quick start
-----------
- Clone the repo: `git clone <repo-url>`
- Enter the project folder: `cd Lost-found`
- Install deps: `npm install`
- Run dev server: `npm run dev`

Common install error
--------------------
If you see `ENOENT: no such file or directory, open '/Users/.../package.json'`, npm is being run from the wrong directory. Make sure you are inside the project folder (the one that contains `package.json`) before running `npm install`. A quick check is `ls package.json` — if it says "No such file", `cd` into the cloned folder first.
