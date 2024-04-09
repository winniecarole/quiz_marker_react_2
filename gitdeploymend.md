- npm i -D gh-pages
- im Package json at the top level

"homepage":"https://github.com/cours-winnie/quiz_marker_react"

- in script at the package json add
-  - "predeploy": "npm run build"
- in script at the package json add
-  -   "deploy": "gh-pages -d build"
-  after that run the command `npm run deploy` in terminal
