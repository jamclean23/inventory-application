// Controller for test route


// ====== FUNCTIONS ======

function testPage (req, res) {
    res.send('test page');
}


// ====== EXPORTS ======

module.exports = {
    page: testPage
}