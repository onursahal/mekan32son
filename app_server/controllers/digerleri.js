var request = require('request');
var express = require('express');
var router = express.Router();

var apiSecenekleri = {
  sunucu : "http://localhost:3000",
  apiYolu: '/api/kullanici/'
}

var mekanBilgisiGetir = function (req, res, callback) {
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + '/api/mekanlar/' + req.params.mekanid,
    method : "GET",
    json : {}
  };
  request(
    istekSecenekleri,
    function(hata, cevap, mekanDetaylari) {
      var gelenMekan = mekanDetaylari;
      if (cevap.statusCode==200) {
        gelenMekan.koordinatlar = {
          enlem : mekanDetaylari.koordinatlar[0],
          boylam : mekanDetaylari.koordinatlar[1]
        };
        callback(req, res,gelenMekan);
      } else {
        hataGoster(req, res, cevap.statusCode);
      }
    }
    ); 
};

var hataGoster = function(req, res,durum){
  var baslik,icerik;
  if(durum==404){
    baslik="404, Sayfa Bulunamadı!";
    icerik="Kusura bakma sayfayı bulamadık!";
  }
  else{
     baslik=durum+", Birşeyler ters gitti!";
     icerik="Ters giden birşey var!";
  }
 res.status(durum);
 res.render('error',{
    sayfaBaslik:baslik,
    icerik:icerik
 });
};

const hakkinda=function(req, res, next) {
  res.render('hakkinda', { 'title': 'Hakkında' });
}
var adminGirisSayfasiOlustur=function(req,res){
  res.render('giris',{
    'sayfaBaslik':'Giriş Yap',
    'hata':req.query.hata
  });
}
const giris=function(req, res, next) {
  adminGirisSayfasiOlustur(req,res);
}
const adminGiris = function(req,res){
  var istekSecenekleri,dogrulanacakKullanici;
  dogrulanacakKullanici = {
    eposta: req.body.mail,
    sifre: req.body.password
  };
  istekSecenekleri = {
    url: apiSecenekleri.sunucu +apiSecenekleri.apiYolu+'giris',
    method: "POST",
    json: dogrulanacakKullanici
  };
  request(
    istekSecenekleri,
    function(hata, cevap, body) {
      if(cevap.statusCode===200) {
        res.redirect('/admin');
      }
      else {
        console.log("2");
        hataGoster(req,res,cevap.statusCode);
      }
    }
  )
}

var kayitOlSayfasiOlustur = function(req, res){
  res.render('kayit-ol',{
    'sayfaBaslik': '',
    'hata':req.query.hata
  });
}
const kayitOl = function(req, res, next) {
  kayitOlSayfasiOlustur(req,res);
}
const kullaniciEkle = function(req,res){
  var istekSecenekleri, gonderilenKullanici;
  gonderilenKullanici = {
    ad: req.body.name,
    eposta: req.body.mail,
    sifre: req.body.password
  };
  istekSecenekleri = {
    url: apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
    method: "POST",
    json: gonderilenKullanici
  };
  if(!gonderilenKullanici.ad || !gonderilenKullanici.eposta || gonderilenKullanici.sifre != req.body.rpassword){
    res.redirect('/kayitol?hata=evet');
  }
  else {
    request(
      istekSecenekleri,
      function(hata, cevap, body) {
        if(cevap.statusCode === 201) {
          res.redirect('/giris');
        }
        else {
          console.log("1");
          hataGoster(req,res,cevap.statusCode);
        }
      }
    )
  }
}


var adminSayfasiOlustur = function(req, res, cevap, mekanListesi){
  res.render('admin',{
    baslik: 'Mekan32',
    sayfaBaslik:{
      siteAd:'Mekan32-Admin',
      aciklama:'Mekanları Yönetin'
    },
    mekanlar:mekanListesi,
    cevap:cevap
  });
}

const admin = function(req,res){
  var istekSecenekleri = {
    url: apiSecenekleri.sunucu+'/api/tummekanlar/',
    method: 'GET',
    json: {}
  };
  request(
    istekSecenekleri,
    function(hata, cevap, mekanlar) {
      if(cevap.statusCode === 200) {
        var gelenMekanlar = mekanlar;
        adminSayfasiOlustur(req, res, cevap, gelenMekanlar);
      }
      else
        hataGoster(req,res,cevap.statusCode);
    }
  ) 
}

var mekanEkleSayfasiOlustur = function(req, res) {
  res.render('mekan-ekle',{
    sayfaBaslik:'Yeni Mekan Ekle',
    hata:req.query.hata
  });
}

const yeniMekanEkle = function(req, res) {
  mekanEkleSayfasiOlustur(req, res);
}
const mekanEkle = function(req, res) {
  var istekSecenekleri,gonderlicekMekan;
  gonderlicekMekan = {
    ad: req.body.name,
    adres: req.body.address,
    imkanlar: req.body.resources,
    enlem:req.body.lat,
    boylam:req.body.lng,
    gunler1:req.body.dayo,
    acilis1:req.body.openo,
    kapanis1:req.body.closeo,
    gunler2:req.body.dayt,
    acilis2:req.body.opent,
    kapanis2:req.body.closet,
    kapali1:false,
    kapali2:false,
  };
  istekSecenekleri = {
    url: apiSecenekleri.sunucu + '/api/mekanlar/',
    method: "POST",
    json: gonderlicekMekan
  };
  request(
    istekSecenekleri,
    function(hata, cevap, body) {
      if(cevap.statusCode === 201)
        res.redirect('/admin');
      else
        hataGoster(req,res,cevap.statusCode);
    }
  )
}

var mekanGuncelleSayfasiOlustur = function(req, res, mekanBilgisi) {
  res.render('mekan-guncelle',{
    sayfaBaslik:mekanBilgisi.ad+' Mekanını Güncelle',
    hata:req.query.hata,
    mekan: {
      ad:mekanBilgisi.ad,
      adres:mekanBilgisi.adres,
      imkanlar:mekanBilgisi.imkanlar,
      enlem:mekanBilgisi.koordinatlar.enlem,
      boylam:mekanBilgisi.koordinatlar.boylam,
      gunler1:mekanBilgisi.saatler[0].gunler,
      acilis1:mekanBilgisi.saatler[0].acilis,
      kapanis1:mekanBilgisi.saatler[0].kapanis,
      gunler2:mekanBilgisi.saatler[1].gunler,
      acilis2:mekanBilgisi.saatler[1].acilis,
      kapanis2:mekanBilgisi.saatler[1].kapanis,
    }
  });
}

const mekanGuncelle = function(req, res, next) {
  mekanBilgisiGetir(req,res,function(req,res,cevap){
    mekanGuncelleSayfasiOlustur(req,res,cevap);
  })
}

const mekanGuncelleReq = function(req, res, mekanBilgisi){
  var istekSecenekleri,gonderlicekMekan;
  gonderlicekMekan = {
    ad: req.body.name,
    adres: req.body.address,
    imkanlar: req.body.resources,
    enlem:req.body.lat,
    boylam:req.body.lng,
    gunler1:req.body.dayo,
    acilis1:req.body.openo,
    kapanis1:req.body.closeo,
    gunler2:req.body.dayt,
    acilis2:req.body.opent,
    kapanis2:req.body.closet,
    kapali1:false,
    kapali2:false,
  };
  istekSecenekleri = {
    url: apiSecenekleri.sunucu + '/api/mekanlar/'+ req.params.mekanid,
    method: "PUT",
    json: gonderlicekMekan
  };
  request(
    istekSecenekleri,
    function(hata, cevap, body) {
      if(cevap.statusCode === 200)
        res.redirect('/admin');
      else
        hataGoster(req,res,cevap.statusCode);
    }
  )
}

const mekanGuncel = function(req,res,next) {
  mekanBilgisiGetir(req,res,function(req,res,cevap){
    mekanGuncelleReq(req,res,cevap);
  })
}
const mekanSilReq = function(req, res, mekanBilgisi){
  istekSecenekleri = {
    url: apiSecenekleri.sunucu+ '/api/mekanlar/deletedelete'+req.params.mekanid,
    method: 'DELETE',
    json: {}
  }
  request(
    istekSecenekleri,
    function(hata,cevap,body){
      if(cevap.statusCode === 204)
        res.redirect('/admin');
      else
        hataGoster(req,res,cevap.statusCode);
    }
  )
}
const mekanSil = function(req, res, mekanBilgisi) {
  mekanBilgisiGetir(req,res,function(req,res,cevap){
      mekanSilReq(req,res,cevap);
  }
  )
}
module.exports={hakkinda,giris,kayitOl,kullaniciEkle,adminGiris,admin,yeniMekanEkle,mekanGuncelle,mekanEkle,mekanGuncel,mekanSil}