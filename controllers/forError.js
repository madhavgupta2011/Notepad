//Function responsible to show not found error page
module.exports.getError = (req,res,next)=>{
    res.status(404).render('404',{
        'title': '404 Error',
        csrfToken : req.csrfToken()
    });
}