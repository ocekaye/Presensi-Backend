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

    var KelasSiswa = Kelas.app.models.kelas_siswa; //panggil model class kelas_siswa
x
    var filter =  {
      where: {
        and: [
            {
              kelasId: Id
            },
            {
              siswaId: siswaIds
            }
          ]
      }
    };

    // cari data berdasarkan kelasId dan siswaId di kelas_siswa
    KelasSiswa.find(filter,
      function (err, data) {

          console.log("Kelas", data);

          if (err) cb(err); // return juka error
          else if (!data) { // return custom error jika data ditak di temukan
            var error = new Error();
            error.status = 404;
            error.name = "Siswa";
            error.message = "Tidak ditemukan.";
            cb(error);
          }
          else {
            // hapus data
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

  //expose detail tugas
  Kelas.remoteMethod('tugasdetail', {
    http: { path: '/:id/tugas/detail', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Kelas id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  // bikin fungsi presensidetail
  Kelas.tugasdetail = function(id, cb) {

    Kelas.findById(id, function (err, res) {

      res.tugas({kelasId: id, include: 'mapel'}, function (err, tugas) {
        if (err) cb(err);
        else {
          cb(null, tugas);
        }
      });
    });
  }

  //expose detail tugas all
  Kelas.remoteMethod('alltugasdetail', {
    http: { path: '/tugas/detail', verb: 'get' },
    accepts: [
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });


  Kelas.alltugasdetail = function(cb) {

    Kelas.find({order: 'nama ASC'}, function (err, res) {
      if (err) cb(err);
      else {
        var loop = [];
        res.forEach(function (result, i) {
          console.log(i);
          getMapel(result, i, function (err, r, index) {
            if (err) cb(null, res);
            else {
              res[index].detailTugas = r;
              loop.push(1);
              if (loop.length == res.length) cb(null, res);
            }
          });

        });
      }
    });
  }

  function getMapel(data, i, cb) {
    data.tugas({include: 'mapel'}, function (err , r) {
      if (err) cb(null, r, i);
      else {
        cb(null, r, i);
      }
    });
  }

  Kelas.remoteMethod('tugasByGuru', {
    http: { path: '/:id/:guruId/tugas', verb: 'get' },
    accepts: [
      { arg: 'id', type: 'string', required: true, description: 'Kelas id.'},
      { arg: 'guruId', type: 'string', required: true, description: 'Guru id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  Kelas.tugasByGuru = function(id, guruId, cb) {
    Kelas.findById(id, function (err, res) {
      if (err) cb(err);
      else {
        res.tugas({where:{guruId: guruId}, include: ['kelas', 'mapel']}, function (err, tugas) {
          if (err) cb(err);
          else {
            cb(null, tugas);
          }
        });
      }
    });
  }
};
