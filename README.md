# My Personal Presentation Template

To run the presentation, run

```
npm install
npm run dev
```

Then open `localhost:5173` to see the presentation. For running the presentation, use Firefox because Safari does not play nice with gradients.

# Compile to PDF

* Make sure presentation is hosted on `localhost:5173`.
* Run
```
./node_modules/.bin/decktape generic http://localhost:5173/ slides.pdf
```
The file will be stored as `slides.pdf`. Currently there is a bug with code blocks. See how it can be fixed.

# Few things to note
For the logo, the `.logo-icon` class is used in the `style.css`. This class contains the dimensions of the logo using the `width` parameter. Change this to make any specific logo fit.