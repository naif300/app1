var express = require('express');
const { body } = require('express-validator/check');
const path = require('path');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var validator = require('express-validator');
const adminController = require('../controllers/admin');
const Category = require('../controllers/dbmodels2/categories');
const Img = require('../controllers/dbmodels2/gallery');
 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const db_url = 'mongodb://localhost:27017/test';
const router = express.Router();
module.exports = function (app) {
// /admin/add-product => GET


      function isUserAllowed(req, res, next) {
            sess = req.session;
            if (sess.user) {
                  return next();
            }
            else { res.redirect('/login'); }
      }

      app.get('/dashboard-blog', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Dashboard' };
            res.render('Dashboard/dashboard-blog');
      });

      app.get('/dashboard-saas', isUserAllowed, function (req, res) {
            res.locals = { title: 'Saas Dashboard' };
            res.render('Dashboard/dashboard-saas');
      });

      app.get('/dashboard-crypto', isUserAllowed, function (req, res) {
            res.locals = { title: 'Crypto Dashboard' };
            res.render('Dashboard/dashboard-crypto');
      });

      app.get('/', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dashboard' };
            res.render('Dashboard/index');
      });

      // Layouts
      app.get('/layouts-horizontal', isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal' };
            res.render('Dashboard/index', { layout: 'layoutsHorizontal' });
      });
      app.get('/layouts-light-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Light Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsLightSidebar' });
      });
      app.get('/layouts-compact-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Compact Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsCompactSidebar' });
      });
      app.get('/layouts-icon-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Icon Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsIconSidebar' });
      });
      app.get('/layouts-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsBoxed' });
      });
      app.get('/layouts-preloader', isUserAllowed, function (req, res) {
            res.locals = { title: 'Preloader' };
            res.render('Dashboard/index', { layout: 'layoutsPreloader' });
      });
      app.get('/layouts-colored-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colored Sidebar' };
            res.render('Dashboard/index', { layout: 'layoutsColoredSidebar' });
      });
      app.get('/layouts-scrollable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Scrollable' };
            res.render('Dashboard/index', { layout: 'layoutsScrollable' });
      });

      app.get('/layouts-h-boxed', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxed Width' };
            res.render('Dashboard/index', { layout: 'layoutsHBoxed' });
      });
      app.get('/layouts-h-preloader', isUserAllowed, function (req, res) {
            res.locals = { title: 'Preloader' };
            res.render('Dashboard/index', { layout: 'layoutsHPreloader' });
      });
      app.get('/layouts-h-scrollable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Scrollable' };
            res.render('Dashboard/index', { layout: 'layoutsHScrollable' });
      });
      app.get('/layouts-h-colored', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colored Topbar' };
            res.render('Dashboard/index', { layout: 'layoutsHColored' });
      });
      app.get('/layouts-h-topbar-light', isUserAllowed, function (req, res) {
            res.locals = { title: 'Topbar Light' };
            res.render('Dashboard/index', { layout: 'layoutsHTopbarLight' });
      });

      // Color Theme vertical
      app.get("/vertical-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Dark' };
            res.render("Dashboard/index", { layout: "vertical-dark-layout" });
      });

      app.get("/vertical-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Vertical Rtl' };
            res.render("Dashboard/index", { layout: "vertical-rtl-layout" });
      });

      // Color Theme Horizontal
      app.get("/horizontal-dark", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Dark' };
            res.render("Dashboard/index", { layout: "horizontal-dark-layout" });
      });

      app.get("/horizontal-rtl", isUserAllowed, function (req, res) {
            res.locals = { title: 'Horizontal Rtl' };
            res.render("Dashboard/index", { layout: "horizontal-rtl-layout" });
      });

  
      app.get('/show', isUserAllowed,adminController.getAddProduct, function (req, res) {
            res.locals = { title: 'Add image' };
            res.render('admin/show');
      })



      app.post('/show', isUserAllowed, function (req, res) {
            MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
              if (err) return console.error(err);
              const db = client.db('test');
              const collection = db.collection('gallerys');
              collection
                .insertOne(req.body)
                .then(() => {
                  res.redirect('/editt');
                })
                .catch(() => {
                  res.redirect('/editt');
                });
            });
          });


 

      app.get('/editt',isUserAllowed, function (req, res) {
            MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
              if (err) return console.error(err);
              const db = client.db('test');
              const collection = db.collection('gallerys');
              collection
                .find()
                .toArray()
                .then((results) => {
                  res.locals = { title: 'edit details' };
                  res.render('admin/editt', { gallerys: results });
                })
                .catch((error) => {
                  res.redirect('/show');
                });
            });
          })
          
          app.put('/editt',  isUserAllowed, function (req, res) {
            MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
                if (err) return console.error(err);
                const db = client.db('test');
                const collection = db.collection('gallerys');
                collection
                    .findOneAndUpdate(
                        { title: req.body.oldtitle, tag: req.body.oldtag,descrption: req.body.olddescrption ,image: req.body.oldimage},
                        {
                            $set: {
                                title: req.body.title,
                                tag: req.body.tag,
                               descrption: req.body.descrption,
                               image :req.body.image
                            }
                        },
                        {
                            upsert: true
                        }
                    )
                    .then(() => {
                        res.json('Success');
                    })
                    .catch(() => {
                        res.locals = { title: 'edit details' };
                        res.redirect('/edit');
                    });
            });
        });
 
          app.delete('/editt', isUserAllowed, function (req, res){
            MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
                if (err) return console.error(err);
                const db = client.db('test');
                const collection = db.collection('gallerys');
                collection
                    .deleteOne(req.body)
                    .then(() => {
                        res.json('Deleted data');
                    })
                    .catch(() => {
                        res.redirect('/edit');
                    });
            });
        });


//  Articles   
app.get('/addarticles', isUserAllowed, function (req, res) {
      res.locals = { title: 'Add Articles' };
      res.render('Articles/addarticles');
})
app.post('/articles', isUserAllowed, function (req, res) {
      MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('test');
        const collection = db.collection('articles');
        collection
          .insertOne(req.body)
          .then(() => {
            res.redirect('/showarticles');
          })
          .catch(() => {
            res.redirect('/addarticles');
          });
      });
    });

    app.get('/showarticles',isUserAllowed, function (req, res) {
      MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('test');
        const collection = db.collection('articles');
        collection
          .find()
          .toArray()
          .then((results) => {
            res.locals = { title: 'show articles' };
            res.render('Articles/showarticles', { articles: results });
          })
          .catch((error) => {
            res.redirect('/articles');
          });
      });
    })
    
    app.put('/editarticles',  isUserAllowed, function (req, res) {
      MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
          if (err) return console.error(err);
          const db = client.db('test');
          const collection = db.collection('articles');
          collection
              .findOneAndUpdate(
                  { title: req.body.oldtitle, short_disc: req.body.oldshort_disc,full_text: req.body.oldfull_text,image:req.body.oldimage },
                  {
                      $set: {
                          title : req.body.title,
                          short_disc : req.body.short_disc,
                          full_text : req.body.full_text,
                          image : req.body.image
                      }
                  },
                  {
                      upsert: true
                  }
              )
              .then(() => {
                  res.json('Success');
              })
              .catch(() => {
                  res.locals = { title: 'edit articles' };
                  res.redirect('/showarticles');
              });
      });
  });

    app.delete('/editarticles', isUserAllowed, function (req, res){
      MongoClient.connect(db_url, { useUnifiedTopology: true }, (err, client) => {
          if (err) return console.error(err);
          const db = client.db('test');
          const collection = db.collection('articles');
          collection
              .deleteOne(req.body)
              .then(() => {
                  res.json('Deleted data');
              })
              .catch(() => {
                  res.redirect('/showarticles');
              });
      });
  });

 

      //Categories
      app.get('/categories', isUserAllowed, function (req, res) {
            res.locals = { title: 'Categories' };
            res.render('Categories/categories');
      })
      app.get('/category-details', isUserAllowed, function (req, res) {
            res.locals = { title: 'Category details' };
            res.render('Categories/category-details');
      })
      app.get('/post-category', isUserAllowed, function (req, res) {
            Category
                  .find()
                  .exec()
                  .then(docs => {
                        console.log(docs);
                        res.locals = { title: 'Category details' };
                        res.status(201).render('Categories/post-category', { docs: docs })
                  })
                  .catch(err => {
                        console.log(err);
                        res.status(500).json({
                              error: err
                        });
                  })
      })
      app.post('/post-category', isUserAllowed, function (req, res) {
            const category = new Category({
                  _id: new mongoose.Types.ObjectId(),
                  name: req.body.name,
                  description: req.body.description
            });
            category.save().then(result => {
                  res.redirect('/post-category')
                  console.log(result);
            }).catch(err => console.log(err));
      })

      // app.get('/post-category/:id', isUserAllowed, function (req, res){
      //       console.log('submitted');
      //       const id = req.params.id;
      //       console.log(id);
      //       Product.remove({ _id: id })
      //             .exec()
      //             .then(res => {
      //                   res.redirect('/post-category')
      //                   console.log('removed ', id)
      //             })
      //             .catch();
      // })

      app.delete('/post-category/delete/:id', isUserAllowed, function (req, res) {
            const id = req.params.id;
            // Product.remove({ _id: id })
            //       .exec()
            //       .then(res => {
            //             res.redirect('/post-category')
            //             console.log('removed ', id)
            //       })
            //       .catch();
            console.log(id)
            Product.findByIdAndDelete(id)
            .then(result => {
                  res.json({ redirect: '/post-category' })
            })
            .catch(err => {
                  console.log(err)
            })
      });


      app.get('/product/:productId', (req, res, next) => {
            const id = req.params.productId;
            Product.findById(id)
                  .exec()
                  .then(doc => {
                        console.log('From database -->', doc);
                        if (doc) {
                              res.status(200).json(doc)
                        } else {
                              res.status(404).json({ message: 'No valid entry for id provided' });
                        }
                        res.status(200).json(doc)
                  })
                  .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                  });
      });





      // Calendar
      app.get('/calendar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Calendar' };
            res.render('Calendar/calendar');
      });

      // Chat
      app.get('/chat', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chats' };
            res.render('Chats/chat');
      });

      // File Manager
      app.get('/apps-filemanager', isUserAllowed, function (req, res) {
            res.locals = { title: 'File Manager' };
            res.render('File/apps-filemanager');
      });


      // Ecomerce
      app.get('/ecommerce-products', isUserAllowed, function (req, res) {
            res.locals = { title: 'Products' };
            res.render('Ecommerce/ecommerce-products');
      });
      app.get('/ecommerce-product-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Product Detail' };
            res.render('Ecommerce/ecommerce-product-detail');
      });
      app.get('/ecommerce-orders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Orders' };
            res.render('Ecommerce/ecommerce-orders');
      });
      app.get('/ecommerce-customers', isUserAllowed, function (req, res) {
            res.locals = { title: 'Customers' };
            res.render('Ecommerce/ecommerce-customers');
      });
      app.get('/ecommerce-cart', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cart' };
            res.render('Ecommerce/ecommerce-cart');
      });
      app.get('/ecommerce-checkout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Checkout' };
            res.render('Ecommerce/ecommerce-checkout');
      });
      app.get('/ecommerce-shops', isUserAllowed, function (req, res) {
            res.locals = { title: 'Shops' };
            res.render('Ecommerce/ecommerce-shops');
      });
      app.get('/ecommerce-add-product', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Product' };
            res.render('Ecommerce/ecommerce-add-product');
      });

      // Crypto
      app.get('/crypto-wallet', isUserAllowed, function (req, res) {
            res.locals = { title: 'Wallet' };
            res.render('Crypto/crypto-wallet');
      });
      app.get('/crypto-buy-sell', isUserAllowed, function (req, res) {
            res.locals = { title: 'Buy/Sell' };
            res.render('Crypto/crypto-buy-sell');
      });
      app.get('/crypto-exchange', isUserAllowed, function (req, res) {
            res.locals = { title: 'Exchange' };
            res.render('Crypto/crypto-exchange');
      });
      app.get('/crypto-lending', isUserAllowed, function (req, res) {
            res.locals = { title: 'Lending' };
            res.render('Crypto/crypto-lending');
      });
      app.get('/crypto-orders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Orders' };
            res.render('Crypto/crypto-orders');
      });
      app.get('/crypto-kyc-application', isUserAllowed, function (req, res) {
            res.locals = { title: 'KYC Application' };
            res.render('Crypto/crypto-kyc-application');
      });


      // Email
      app.get('/email-inbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Inbox' };
            res.render('Email/email-inbox');
      });
      app.get('/email-read', isUserAllowed, function (req, res) {
            res.locals = { title: 'Read Email' };
            res.render('Email/email-read');
      });
      app.get('/email-template-basic', isUserAllowed, function (req, res) {
            res.locals = { title: 'Basic Action' };
            res.render('Email/Templates/email-template-basic');
      });
      app.get('/email-template-alert', isUserAllowed, function (req, res) {
            res.locals = { title: 'Alert Email' };
            res.render('Email/Templates/email-template-alert');
      });
      app.get('/email-template-billing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Billing Email' };
            res.render('Email/Templates/email-template-billing');
      });

      // Invoices
      app.get('/invoices-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoices List' };
            res.render('Invoice/invoices-list');
      });
      app.get('/invoices-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Invoices Detail' };
            res.render('Invoice/invoices-detail');
      });

      ///Projects
      app.get('/projects-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects Grid' };
            res.render('Projects/projects-grid');
      });
      app.get('/projects-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects List' };
            res.render('Projects/projects-list');
      });
      app.get('/projects-overview', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects Overview' };
            res.render('Projects/projects-overview');
      });
      app.get('/projects-create', isUserAllowed, function (req, res) {
            res.locals = { title: 'Projects Create' };
            res.render('Projects/projects-create');
      });

      // Tasks
      app.get('/tasks-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tasks List' };
            res.render('Tasks/tasks-list');
      });
      app.get('/tasks-kanban', isUserAllowed, function (req, res) {
            res.locals = { title: 'Kanban Board' };
            res.render('Tasks/tasks-kanban');
      });
      app.get('/tasks-create', isUserAllowed, function (req, res) {
            res.locals = { title: 'Create Task' };
            res.render('Tasks/tasks-create');
      });

      //contacts
      app.get('/contacts-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Contacts User Grid' };
            res.render('Contacts/contacts-grid');
      });
      app.get('/contacts-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Contacts User List' };
            res.render('Contacts/contacts-list');
      });
      app.get('/contacts-profile', isUserAllowed, function (req, res) {
            res.locals = { title: 'Contacts Profile' };
            res.render('Contacts/contacts-profile');
      });

      //Blog
      app.get('/blog-list', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog List' };
            res.render('Blog/blog-list');
      });
      app.get('/blog-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Grid' };
            res.render('Blog/blog-grid');
      });
      app.get('/blog-details', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Details' };
            res.render('Blog/blog-details');
      });


      // Pages
      app.get('/pages-starter', isUserAllowed, function (req, res) {
            res.locals = { title: 'Starter Page' };
            res.render('Pages/pages-starter');
      });
      app.get('/pages-timeline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Timeline' };
            res.render('Pages/pages-timeline');
      });
      app.get('/pages-faqs', isUserAllowed, function (req, res) {
            res.locals = { title: 'FAQs' };
            res.render('Pages/pages-faqs');
      });
      app.get('/pages-pricing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Pricing' };
            res.render('Pages/pages-pricing');
      });

      // UI
      app.get('/ui-alerts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Alerts' };
            res.render('Ui/ui-alerts');
      });
      app.get('/ui-buttons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Buttons' };
            res.render('Ui/ui-buttons');
      });
      app.get('/ui-cards', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cards' };
            res.render('Ui/ui-cards');
      });
      app.get('/ui-carousel', isUserAllowed, function (req, res) {
            res.locals = { title: 'Carousel' };
            res.render('Ui/ui-carousel');
      });
      app.get('/ui-grid', isUserAllowed, function (req, res) {
            res.locals = { title: 'Grid' };
            res.render('Ui/ui-grid');
      });
      app.get('/ui-lightbox', isUserAllowed, function (req, res) {
            res.locals = { title: 'Lightbox' };
            res.render('Ui/ui-lightbox');
      });
      app.get('/ui-modals', isUserAllowed, function (req, res) {
            res.locals = { title: 'Modals' };
            res.render('Ui/ui-modals');
      });
      app.get('/ui-rangeslider', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rangeslider' };
            res.render('Ui/ui-rangeslider');
      });
      app.get('/ui-session-timeout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Session Timeout' };
            res.render('Ui/ui-session-timeout');
      });
      app.get('/ui-progressbars', isUserAllowed, function (req, res) {
            res.locals = { title: 'Progress Bars' };
            res.render('Ui/ui-progressbars');
      });
      app.get('/ui-sweet-alert', isUserAllowed, function (req, res) {
            res.locals = { title: 'Sweet Alert' };
            res.render('Ui/ui-sweet-alert');
      });
      app.get('/ui-tabs-accordions', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tabs & Accordions' };
            res.render('Ui/ui-tabs-accordions');
      });
      app.get('/ui-typography', isUserAllowed, function (req, res) {
            res.locals = { title: 'Typography' };
            res.render('Ui/ui-typography');
      });
      app.get('/ui-video', isUserAllowed, function (req, res) {
            res.locals = { title: 'Video' };
            res.render('Ui/ui-video');
      });
      app.get('/ui-general', isUserAllowed, function (req, res) {
            res.locals = { title: 'General' };
            res.render('Ui/ui-general');
      });
      app.get('/ui-colors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Colors' };
            res.render('Ui/ui-colors');
      });
      app.get('/ui-rating', isUserAllowed, function (req, res) {
            res.locals = { title: 'Rating' };
            res.render('Ui/ui-rating');
      });
      app.get('/ui-notifications', isUserAllowed, function (req, res) {
            res.locals = { title: 'Notifications' };
            res.render('Ui/ui-notifications');
      });
      app.get('/ui-image-cropper', isUserAllowed, function (req, res) {
            res.locals = { title: 'Image Cropper' };
            res.render('Ui/ui-image-cropper');
      });
      app.get('/ui-images', isUserAllowed, function (req, res) {
            res.locals = { title: 'Images' };
            res.render('Ui/ui-images');
      });
      app.get('/ui-dropdowns', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dropdowns' };
            res.render('Ui/ui-dropdowns');
      });

      // Forms
      app.get('/form-elements', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Elements' };
            res.render('Form/form-elements');
      });
      app.get('/form-elements', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form-Elementss' };
            res.render('Form/form-elementss');
      });
      app.get('/form-layouts', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Layouts' };
            res.render('Form/form-layouts');
      });
      app.get('/form-validation', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Validation' };
            res.render('Form/form-validation');
      });
      app.get('/form-advanced', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Advanced' };
            res.render('Form/form-advanced');
      });
      app.get('/form-editors', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Editors' };
            res.render('Form/form-editors');
      });
      app.get('/form-uploads', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Uploads' };
            res.render('Form/form-uploads');
      });
      app.get('/form-xeditable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Xeditable' };
            res.render('Form/form-xeditable');
      });
      app.get('/form-repeater', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Repeater' };
            res.render('Form/form-repeater');
      });
      app.get('/form-wizard', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Wizard' };
            res.render('Form/form-wizard');
      });
      app.get('/form-mask', isUserAllowed, function (req, res) {
            res.locals = { title: 'Form Mask' };
            res.render('Form/form-mask');
      });

      // Tables
      app.get('/tables-basic', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Basic' };
            res.render('Tables/tables-basic');
      });
      app.get('/tables-datatable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Datatable' };
            res.render('Tables/tables-datatable');
      });
      app.get('/tables-responsive', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Responsive' };
            res.render('Tables/tables-responsive');
      });
      app.get('/tables-editable', isUserAllowed, function (req, res) {
            res.locals = { title: 'Tables Editable' };
            res.render('Tables/tables-editable');
      });

      // Charts
      app.get('/charts-apex', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Apex' };
            res.render('Charts/charts-apex');
      });
      app.get('/charts-echart', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Echart' };
            res.render('Charts/charts-echart');
      });
      app.get('/charts-chartjs', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Chartjs' };
            res.render('Charts/charts-chartjs');
      });
      app.get('/charts-flot', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Flot' };
            res.render('Charts/charts-flot');
      });
      app.get('/charts-tui', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Toast UI' };
            res.render('Charts/charts-tui');
      });
      app.get('/charts-knob', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts knob' };
            res.render('Charts/charts-knob');
      });
      app.get('/charts-sparkline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Charts Sparkline' };
            res.render('Charts/charts-sparkline');
      });

      // Icons
      app.get('/icons-boxicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Boxicons' };
            res.render('Icons/icons-boxicons');
      });
      app.get('/icons-materialdesign', isUserAllowed, function (req, res) {
            res.locals = { title: 'Material Design' };
            res.render('Icons/icons-materialdesign');
      });
      app.get('/icons-dripicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dripicons' };
            res.render('Icons/icons-dripicons');
      });
      app.get('/icons-fontawesome', isUserAllowed, function (req, res) {
            res.locals = { title: 'Fontawesome' };
            res.render('Icons/icons-fontawesome');
      });

      // Maps
      app.get('/maps-google', isUserAllowed, function (req, res) {
            res.locals = { title: 'Google Maps' };
            res.render('Maps/maps-google');
      });
      app.get('/maps-vector', isUserAllowed, function (req, res) {
            res.locals = { title: 'Vector Maps' };
            res.render('Maps/maps-vector');
      });
      app.get('/maps-leaflet', isUserAllowed, function (req, res) {
            res.locals = { title: 'Leaflet Maps' };
            res.render('Maps/maps-leaflet');
      });



}
/*
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isString(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  adminController.postAddProduct
);

module.exports = router;*/