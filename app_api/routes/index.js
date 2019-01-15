var express = require('express');
var router = express.Router();
var ctrlMekanlar=require('../controllers/mekanlar');
var ctrlYorumlar=require('../controllers/yorumlar');
var ctrlKullanici=require('../controllers/kullanicilar');

//mekanlariListele:Girilen enlem ve boylam çevresindeki mekanları listeler
//mekanEkle:Yeni mekan ekler
router
.route('/mekanlar')
.get(ctrlMekanlar.mekanlariListele)
.post(ctrlMekanlar.mekanEkle);

router
.route('/tummekanlar')
.get(ctrlMekanlar.tumMekanlariListele)
//mekana ait işlemler
//ID'sine göre mekan getir, güncelle,sil
router
.route('/mekanlar/:mekanid')
.get(ctrlMekanlar.mekanGetir)
.put(ctrlMekanlar.mekanGuncelle)
.delete(ctrlMekanlar.mekanSil);
//yorumlar
//Mekanın ID'sine göre yorum ekle
router
.route('/mekanlar/:mekanid/yorumlar')
.post(ctrlYorumlar.yorumEkle);
//Mekanın ID'sine ve yorumun ID'sine göre yorum getir,güncelle, sil
router
.route('/mekanlar/:mekanid/yorumlar/:yorumid')
.get(ctrlYorumlar.yorumGetir)
.put(ctrlYorumlar.yorumGuncelle)
.delete(ctrlYorumlar.yorumSil);
router
.route('/kullanici')
.post(ctrlKullanici.kullaniciEkle)
router
.route('/kullanici/giris')
.post(ctrlKullanici.adminGiris);
module.exports = router;
