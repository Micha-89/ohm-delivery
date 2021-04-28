const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})()

async function getOhmById(id) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({ id })
        .value()

    return ohm;
}

async function getOhmByTrackingId(trackingId) {
  const _db = await db;
  const ohm = _db.get('ohms')
      .find({ trackingId })
      .value()

  return ohm;
}


async function declineOhm({trackingId, reasonDecline}) {
  const _db = await db;
  const history = _db.get('ohms')
      .find({ trackingId })
      .get('history')
      .value()

  history.push({
    "state": 'REFUSED',
    "at": "123456789",
    "reasonDecline": reasonDecline
  });

  _db.get('ohms')
    .find({ trackingId })
    .assign({ history })
    .write();

  const ohm = _db.get('ohms')
    .find({ trackingId })
    .value()

  return ohm;
}

async function acceptOhm(trackingId) {
  const _db = await db;
  const history = _db.get('ohms')
      .find({ trackingId })
      .get('history')
      .value()

  history.push({
    "state": 'DELIVERED',
    "at": "123456789"
  });

  _db.get('ohms')
    .find({ trackingId })
    .assign({ history })
    .write();

  const ohm = _db.get('ohms')
    .find({ trackingId })
    .value()

  return ohm;
}


module.exports = { getOhmById, getOhmByTrackingId, declineOhm, acceptOhm };
