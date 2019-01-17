var sitemaps = require('sitemap-stream-parser');
var Crawler = require("crawler");
var urls = [];

urls.push('https://brickscout.com/sitemaps/shops/de/0.xml');
urls.push('https://brickscout.com/sitemaps/shops/en/0.xml');
urls.push('https://brickscout.com/sitemaps/shops/it/0.xml');
urls.push('https://brickscout.com/sitemaps/shops/nl/0.xml');

for (i = 146; i >= 0; i--) {
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
sitemaps.parseSitemaps(urls, function(url) { 
c.queue(url);
}, function(err, sitemaps) {
// start crawler
});
console.log("Start crawler");
