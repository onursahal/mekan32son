const mongoose=require('mongoose');
const Kullanici=mongoose.model('kullanici');

const cevapOlustur = function(res, status, content) {
    res
        .status(status)
        .json(content);
}

var kullaniciEkle = function(req, res) {
        Kullanici.create({
            ad: req.body.ad,
            eposta: req.body.eposta,
            sifre: req.body.sifre,
        },
        function(hata, kullanici){
            if(hata){
                cevapOlustur(res,400,hata);
            }
            else {
                cevapOlustur(res,201,kullanici);
            }
        });
};

var adminGiris = function(req, res) {
    Kullanici.find({eposta:req.body.eposta})
    .exec(
        function(hata,cevap){
            if(cevap.length > 0) {
                if(cevap[0].sifre === req.body.sifre){
                    cevapOlustur(res,200,cevap);
                }
                else {
                    cevapOlustur(res,401,{"durum":"sifre hatalı"});
                }
            }
            else {
                cevapOlustur(res,401,{"durum":"sifre hatalı"});
            }
        }
    )
}
module.exports = {
    kullaniciEkle,
    adminGiris
}


