var Promise = require('bluebird');

module.exports = function(Siswa) {

  Siswa.addBulk = function(data, callback){
    new Promise(function (resolve, reject) {
      var i = 0;
      data.forEach(function (d) {
        i++;
        Siswa.create(d, function(err, result){
          if(err) reject(err);
          else if(i >= data.size) resolve(result);
        });
      });
    }).then(function (res) {
        callback(null, res);
    });
  };

  Siswa.remoteMethod('addBulk',
    {
      http: { path: '/addBulk', verb: 'post' },

      accepts: [
        { arg: 'data', type: 'string', required: true}
      ],
      description: [
        'Delete content.'
      ],

      returns:{ arg: 'result', type: 'string', 'root': true }

    })

  //expose tambahSiswa
  Siswa.remoteMethod('nilaidetail', {
    http: { path: '/:id/nilai/detail', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Siswa id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi presensidetail
  Siswa.nilaidetail = function(id, cb) {

    Siswa.prototype.nilais({where: {siswaId: id}, include: 'tugas'}, function (err, tugas) {
      if (err) cb(err);
      else {
        cb(null, tugas);
      }
    });

  }

};
