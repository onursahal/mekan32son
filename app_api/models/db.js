var mongoose = require( 'mongoose' ); 
//var mlabDBURI = 'mongodb://sinan:sinan1234@ds255320.mlab.com:55320/mekan32'; 
var dbURI = 'mongodb://onursahal:qwe123@ds219191.mlab.com:19191/odev';
mongoose.connect(dbURI, {useNewUrlParser: true});
//Bağlandığında konsola bağlantı bilgilerini yazdır.
mongoose.connection.on('connected', function () {
  console.log('Mongoose ' + dbURI+ 
    ' adresindeki veritabanına bağlandı\n');
});
//Bağlantı hatası olduğunda konsola hata bilgisini yazdır
mongoose.connection.on('error',function (err) {
  console.log('Mongoose bağlantı hatası\n: ' + err);
});
//Bağlantı  kesildiğinde konsola kesilme bilgisini yaz.
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose bağlantısı kesildi\n');
});

kapat = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose kapatıldı\n ' + msg);
        callback();
    });
};
// Uygulama kapandığında kapat.
process.on('SIGINT', function() {
    kapat('Uygulama kapatıldı\n', function() {
        process.exit(0);
    });
});

// nodemon kullanıyorsanız ayrı bir kapatma işlemi gerekir.
process.once('SIGUSR2', function() {
    kapat('nodemon kapatıldı\n', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});



// Herokudan kapatma işlemi gerçekleşirse
process.on('SIGTERM', function() {
    kapat('heroku kapatıldı\n', function() {
        process.exit(0);
    });
});
require('./kullanicisema');
require('./mekansema');