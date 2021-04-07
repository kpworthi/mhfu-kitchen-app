let express = require("express"),
    router = express.Router(),
    pool = require('../db.js');

// GET
router.get("/skills", async (req, res, next) => {
    let conn;
    const queryType  = req.query.type;
    const queryValue = req.query.value;
    let  whereStmt  = '';

    if ( queryType ) {
      whereStmt = ` WHERE ${ queryType } LIKE '%${ queryValue }%'`
    }
    try {
        conn = await pool.getConnection();
        var query = `SELECT * FROM skill${whereStmt}`;
        var rows = await conn.query(query);
        res.send(rows);   
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

module.exports = router;
