'use strict';

module.exports = function(Jadwal) {

  //expose tambahSiswa
  Jadwal.remoteMethod('presensidetail', {
    http: { path: '/:id/presensis/detail', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Jadwal id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi presensidetail
  Jadwal.presensidetail = function(id, cb) {

    Jadwal.prototype.presensis({where: {jadwalId: id}, include: 'siswas'}, function (err, presensi) {
      if (err) cb(err);
      else {
        cb(null, presensi);
      }
    });

  }

};
