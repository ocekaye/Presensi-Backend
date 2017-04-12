module.exports = function(Kelas) {

  // bikin fungsi tambahSiswa
  Kelas.tambahSiswa = function(id, siswaIds, cb) {

    // cek apakah id kelas ada
    Kelas.findById(id, function (err, res) {

      if (err) cb(err); // return error jika hasil terjadi error

      else if (!res) { // return custom error jika kelas ditak di temukan
        var error = new Error();
        error.status = 404;
        error.name = "Kelas";
        error.message = "Kelas dengan id "+id+" tidak ditemukan.";
        cb(error);
      }
      else {
        // id kelas ada
        var KelasSiswa = Kelas.app.models.kelas_siswa;
        for (var i = 0; i < siswaIds.length; i++){
            var obj = {};
            obj.kelasId = id;
            obj.siswaId = siswaIds[i];
            KelasSiswa.create(obj, function (err, res) {

            });
        }
        cb(null, "added");

      }
    });

  }

  //expose tambahSiswa
  Kelas.remoteMethod('tambahSiswa', {
    http: { path: '/:id/addSiswa', verb: 'post' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Kelas id.'},
      { arg: 'siswaIds', type: 'array', required: true, description: 'Siswa id.', http: { source: 'body' } }
      ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi hapusSiswa
  Kelas.hapusSiswa = function(Id, siswaIds, cb) {
    var KelasSiswa = Kelas.app.models.kelas_siswa;
    KelasSiswa.find({where: {and: [{kelasId: Id}, {siswaId: siswaIds}]}},
      function (err, data) {
          console.log("Kelas", data);
          if (err) cb(err);
          else if (!data) { // return custom error jika data ditak di temukan
            var error = new Error();
            error.status = 404;
            error.name = "Siswa";
            error.message = "Tidak ditemukan.";
            cb(error);
          }
          else {
            KelasSiswa.destroyById(data[0].id, function (err, res) {
              if (err) cb(err);
              else cb(null, res);
            });
          }
      });
  }

  //expose hapusSiswa
  Kelas.remoteMethod('hapusSiswa', {
    http: { path: '/:id/remove', verb: 'post' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Kelas id.'},
      { arg: 'siswaIds', type: 'string', required: true, description: 'Siswa id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });
};
