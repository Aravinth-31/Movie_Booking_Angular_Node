var express = require('express');
var cors = require('cors')
var router = express.Router();
router.use(cors())
var Controller = require('../Controller/Controller');

var Sequelize = require('sequelize');
var theatre = require('../models').Theatre;
var movie = require('../models').Movie;

// theatre.findAll({ where: { name: 'coT1' }, include: movie })
//   .then(theat => {
//     theat.map(thea => {
//       console.log(thea)
//       thea.createMovie({
//         name: 'Thor: The Dark World',
//         info: 'Action, Adventure',
//         desc: 'Thor sets out on a journey to defeat Malekith, the leader of the Dark Elves when he returns to Asgard to retrieve a dangerous weapon and fulfill his desire of destroying the Nine Realms.',
//         image: 'https://cdn.onebauer.media/one/empire-tmdb/films/76338/images/3FweBee0xZoY77uO1bhUOlQorNH.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
//         Date: '2020-07-15',
//         showtime: 'night',
//         row: thea.row,
//         col: thea.col,
//         booked: []
//       })
//     })
//   })
//   .catch(err => console.log(err));


router.post('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({ title: 'Express' });
});

router.get('/locations', async function (req, res) {
  try {
    const ans = await Controller.locations();

    res.json(ans);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
})

router.post('/theatres', async function (req, res) {
  try {
    const ans = await Controller.theatres(req);

    res.json(ans);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
})

router.post('/updateBooking', async function (req, res) {
  try {
    const ans = await Controller.updateBooking(req);

    res.json(ans);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  };
});

router.post('/movie', async function (req, res) {
  try {
    const ans = await Controller.Movie(req);

    res.json(ans);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post('/logIn', async function (req, res) {
  try {
    const ans = await Controller.logIn(req);
    console.log(ans);
    res.json(ans);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
})
router.post('/signIn', async function (req, res) {
  try {
    const ans = await Controller.signIn(req);
    res.json(ans);
  }
  catch (err) {
    res.json(err);
  }
})

router.post('/addTicket', async function (req, res) {
  try {
    const ans = await Controller.addTicket(req);
    console.log(ans);
    res.json(ans);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
})

router.post('/getTickets', async function (req, res) {
  try {
    const ans = await Controller.getTickets(req);
    res.json(ans.Tickets);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
})
module.exports = router;

