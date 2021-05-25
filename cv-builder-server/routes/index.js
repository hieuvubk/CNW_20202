const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/template-v1', function (req, res, next) {
    res.sendFile(path.join(appRoot, 'public', 'myCV.html'));
});

router.get('/template-v2', function (req, res) {
    res.sendFile(path.join(appRoot, 'public', 'myCV1.html'));
});

module.exports = router;
