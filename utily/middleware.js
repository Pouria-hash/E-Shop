

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnUrl = req.originalUrl;
        throw new Error('you need to login first')
    }
    next()
}

module.exports.admin = (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(402)
        throw new Error('You must be an admin')
    }
}

// module.exports.isAuthor = async (req, res, next) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     if (!campground.author.equals(req.user._id)) {
//         req.flash('error', 'you have not permision')
//         res.redirect(`/campground/${id}`)
//     } else {
//         next()
//     }