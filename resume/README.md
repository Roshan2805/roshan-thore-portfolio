# Resume

`resume.html` is the source for `public/Roshan-Thore-Resume.pdf`. Edit the HTML, then rebuild the PDF from the repo root:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --virtual-time-budget=5000 --print-to-pdf=public/Roshan-Thore-Resume.pdf "file://$PWD/resume/resume.html"
```

Check the result is still one page. Fonts are Carlito (SIL Open Font License) in `fonts/`.
