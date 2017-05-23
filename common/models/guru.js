module.exports = function(Guru) {
  Guru.remoteMethod('jadwaldetail', {
    http: { path: '/:id/jadwal/detail', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Guru id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi presensidetail
  Guru.jadwaldetail = function(id, cb) {

    Guru.prototype.jadwals({where: {guruId: id}, include: ['kelas', 'mapel']}, function (err, jadwal) {
      if (err) cb(err);
      else {
        cb(null, jadwal);
      }
    });
  };

  Guru.remoteMethod('tugasdetail', {
    http: { path: '/:id/tugas/detail', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Guru id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  Guru.tugasdetail = function(id, cb) {

    Guru.prototype.tugas({where: {guruId: id}, include: ['kelas', 'mapel']}, function (err, tugas) {
      if (err) cb(err);
      else {
        cb(null, tugas);
      }
    });
  }
};
