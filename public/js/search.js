const Article = require('../../models/article.js');

const apply = (req, res) => {
  const result = req.body.search;

  Article.find({$text:{$search: result}}, (err, docs) => {
    res.render('blog.hbs', {
      items: docs,
      title: 'Blog | Outsider Signal'
    });
  });
}

module.exports = {
  apply
}