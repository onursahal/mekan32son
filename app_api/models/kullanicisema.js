var mongoose = require( 'mongoose' );

var kullaniciSema = new mongoose.Schema(
    {
        ad:{type:String,required:true},
        eposta:{type:String,required:true},
        sifre:{type:String,require:true}
    },{usePushEach: true}
);

mongoose.model('kullanici',kullaniciSema,'kullanicilar');

