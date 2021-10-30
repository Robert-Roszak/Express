const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));


app.use('/user', (req, res, next) => {
  res.render('forbidden');
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/info', (req, res) => {
  res.render('info', {layout: 'dark'});
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('projectDesign'), (req, res) => {
  const { author, sender, title, message } = req.body;

  if(author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, fileName: req.file.originalname, uploadedPic: req.file.filename });
  }
  else {
    res.render('contact', { isError: true });
  }

});

app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});