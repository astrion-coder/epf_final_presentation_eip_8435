# My Personal Presentation Template

To run the presentation, run

```
npm install
npm run dev
```

Then open `localhost:5173` to see the presentation.

# Compile to PDF

* Make sure presentation is hosted on `localhost:5173`.
* Run
```
./node_modules/.bin/decktape generic http://localhost:5173/ slides.pdf
```
The file will be stored as `slides.pdf`. Currently there is a bug with code blocks. See how it can be fixed.