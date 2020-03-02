/**
 * @package    BrickCrawler
 *
 * @author     Andy Wunderlich <hello@andy-wunderlich.de>
 * @copyright  Andy Wunderlich
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://www.andy-wunderlich.de
 */

var sitemaps = require('sitemap-stream-parser');
var Crawler = require("crawler");

var urls = [];

urls.push('https://brickscout.com/sitemaps/shops/de/0.xml');
urls.push('https://brickscout.com/sitemaps/shops/en/0.xml');
urls.push('https://brickscout.com/sitemaps/shops/it/0.xml');
urls.push('https://brickscout.com/sitemaps/shops/nl/0.xml');

for (i = 154; i >= 0; i--) {
    urls.push('https://brickscout.com/sitemaps/products/de/'+i+'.xml');
    urls.push('https://brickscout.com/sitemaps/products/en/'+i+'.xml');
    urls.push('https://brickscout.com/sitemaps/products/it/'+i+'.xml');
    urls.push('https://brickscout.com/sitemaps/products/nl/'+i+'.xml');
}

all_urls = [];

var c = new Crawler({
    maxConnections : 2,
    //rateLimit: 1000, // `maxConnections` will be forced to 1
    userAgent: 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            //a lean implementation of core jQuery designed specifically for the server
            console.log(res.options.uri);
        }
        done();
    }
});

let date_ob = new Date();

sitemaps.parseSitemaps(urls, (url) => { 
    // Split url
    let splittedUrl = url.split('/');

    if (splittedUrl[4] == 'products') {

        try {
            let productId = parseInt(splittedUrl[6]);
            let currentDay = date_ob.getDate();

            // Check modulo of url by 26 and current day
            let moduloResult = productId % 26;

            if (moduloResult == currentDay) {
                c.queue(url);
            }
        }
        catch (ex) {
            console.log("Error in url: " + url);
        }

    } else {
        c.queue(url);
    }

}, function(err, sitemaps) {
    // start crawler
});

console.log("Start crawler");
