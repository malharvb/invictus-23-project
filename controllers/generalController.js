const {getHeadlines} = require('./newsController')


exports.getHomePage = async (req, res, next) => {
    const newsList = await getHeadlines(req);
    const region = req.query.region || 'USA'
    res.render('general/home.ejs', {newsList: newsList, region: region})
}

exports.fetchData = async (req, res) => {

    const db = req.app.locals.db
    const {collection, query} = req.body

    dbData = await db.collection(collection).find(query).toArray()
    res.status(200).json(dbData)
}