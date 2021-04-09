let express = require("express"),
    router = express.Router(),
    pool = require('../db.js');

// GET skills
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

// GET recipes
router.get("/recipes", async (req, res, next) => {
    let conn;
    const chefCount  = req.query.chefs;
    const table      = `${{"1": "one", "2":"two", "3":"three", "4":"four", "5":"five"}[chefCount]}_chef_recipe`

    try {
        conn = await pool.getConnection();
        var query = `SELECT * FROM ${table}`;
        var rows = await conn.query(query);
        res.send(rows);   
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

module.exports = router;
