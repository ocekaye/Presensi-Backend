'use strict';

module.exports = function(Tugas) {

  Tugas.disableRemoteMethod('find', true);
  Tugas.disableRemoteMethod('findById', true);

  //expose tugas
  Tugas.remoteMethod('tugas', {
    http: { path: '/', verb: 'get' },
    accepts: [
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi tugas
  Tugas.tugas = function(cb) {
    Tugas.find({include: 'mapel'},function (err, res) {
      if(err) cb(err);
      else {
        cb(null, res);
      }
    });

  };

  //expose tambahSiswa
  Tugas.remoteMethod('findId', {
    http: { path: '/:id/tugas', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Tugas id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi presensidetail
  Tugas.findId = function(id, cb) {

    Tugas.find({where:{'id': id}, include: 'mapel'}, function (err, res) {
      if(err) cb(err);
      else if(res.length > 0){
        cb(null, res[0]);
      } else{
        var error = new Error();
        error.statusCode = 400;
        error.message = "Id Tugas "+id+" Not Found"
        cb(error);
      }
    });
  };

  //expose tambahSiswa
  Tugas.remoteMethod('nilaidetail', {
    http: { path: '/:id/nilai/detail', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Tugas id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi presensidetail
  Tugas.nilaidetail = function(id, cb) {

    Tugas.prototype.nilais({where: {tugasId: id}, include: 'siswas'}, function (err, nilais) {
      if (err) cb(err);
      else {
        cb(null, nilais);
      }
    });

  };



};
