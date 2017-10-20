module.exports = function(Nilai) {
  Nilai.remoteMethod('nilaiByMapelSiswa', {
    http: { path: '/:mapelId/:siswaId', verb: 'get' },
    accepts: [
      { arg: 'mapelId', type: 'string', required: true, description: 'Mapel id.'},
      { arg: 'siswaId', type: 'string', required: true, description: 'Siswa id.'}
    ],
    returns: {arg: 'result', type: 'string', root: true}
  });

  Nilai.nilaiByMapelSiswa = function(mapelId, siswaId, cb) {
    Nilai.app.models.Tugas.find({where: {"mapelId": mapelId}, include: ['mapel', 'nilais']}, function (err, tugas) {
        if (err) cb(err);
        cb(null, tugas);
    });
  };

};
