//Index controller
exports.show = (req, res) => {
    //Show index content
    res.render('index', { title: 'Express' });
}