// Controller for 404

function fourOhFour (req, res) {
    res.set();
    res.status(404).send('Oops, page not found');
}

module.exports = fourOhFour;