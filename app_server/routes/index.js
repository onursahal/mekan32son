var express = require('express');
var router = express.Router();

var ctrlMekanlar=require('../controllers/mekanlar');
var ctrlDigerleri=require('../controllers/digerleri');

/* GET home page. */
router.get('/',ctrlMekanlar.anaSayfa);
router.get('/mekan/:mekanid',ctrlMekanlar.mekanBilgisi);
router.get('/mekan/:mekanid/yorum/yeni',ctrlMekanlar.yorumEkle);
router.post('/mekan/:mekanid/yorum/yeni',ctrlMekanlar.yorumumuEkle);
router.get('/hakkinda',ctrlDigerleri.hakkinda);
router.get('/giris',ctrlDigerleri.giris);
router.post('/giris',ctrlDigerleri.adminGiris);
router.get('/kayitol',ctrlDigerleri.kayitOl);
router.post('/kayitol',ctrlDigerleri.kullaniciEkle);
router.get('/admin',ctrlDigerleri.admin);
router.get('/admin/mekan/yeni',ctrlDigerleri.yeniMekanEkle);
router.post('/admin/mekan/yeni',ctrlDigerleri.mekanEkle);
router.get('/admin/mekan/:mekanid/guncelle',ctrlDigerleri.mekanGuncelle);
router.post('/admin/mekan/:mekanid/guncelle',ctrlDigerleri.mekanGuncel);
router.get('/admin/mekan/:mekanid/sil',ctrlDigerleri.mekanSil);
module.exports = router;
