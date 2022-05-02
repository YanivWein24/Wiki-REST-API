const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
// must use in order to work with EJS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB",
    { useNewUrlParser: true });

const articleSchema = {
    title: {
        type: String,
        required: [true, "Cant use empty title field"]
    },
    content: {
        type: String,
        required: [true, "Cant use empty Content field"]
    }
};

const Article = mongoose.model("Article", articleSchema);


//? ///////////////////   requests targeting ALL articles   /////////////////

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) { //find ALL articles (the condition inside 'find' is empty)
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {  //! * delete ALL *
            if (!err) {
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        });
    });


//? ///////////////////   requests targeting a specific article   /////////////////

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, article) {
            if (!err) {
                if (article !== undefined && article !== null) {
                    res.send(article);
                } else {
                    const titleName = req.params.articleTitle;
                    res.send("Could not GET requested article: '" + titleName + "', since its not existed");
                }
            } else {
                res.send(err);
            }
        });
    })

    //? Update (overwrite) the *ENTIRE* document 
    .put(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle }, // condition query
            { title: req.body.title, content: req.body.content },  // updates (using body-parser)
            function (err) {
                if (!err) {
                    res.send("Successfully updated the selected article");
                } else {
                    res.send(err);
                }
            }
        );
    })

    //? OverWright (update) only *SOME* attributes of the document 
    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle }, // condition query
            { $set: req.body },  //  req.body = { title: "", content: ""}
            function (err, results) {
                if (!err) {
                    res.write("Successfully updated the selected article\n");
                    res.write(JSON.stringify(results));
                    res.send();
                } else {
                    res.send(err);
                }
            }
        );
    })

    .delete(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, article) {
            if (!err) {
                if (article !== null) {
                    Article.deleteOne(
                        { title: article.title },
                        function (err) {  //! * delete One *
                            console.log(article);
                            if (!err) {
                                res.send("Successfully deleted the selected article: " + article.title);
                            } else {
                                res.send(err);
                            }
                        })
                } else {
                    res.send("Could not find the selected article")
                };
            } else {
                res.send(err);
            }
        });
    });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});

