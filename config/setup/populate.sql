\c back_to_the_pictures; 
/** Create users **/
INSERT INTO users(name, email, role, password) VALUES('Thibaut', 'thibaut@sfr.fr', 'admin', '1234');
INSERT INTO users(name, email, role, password) VALUES('Franck', 'franck@google.fr', 'user', '1234');
INSERT INTO users(name, email, role, password) VALUES('Huy', 'huy@google.fr', 'admin', '1234');
INSERT INTO users(name, email, role, password) VALUES('Marc', 'marc@google.fr', 'user', '1234');
/** Create spots ***/
INSERT INTO spots(name, latitude, longitude) VALUES('Lacaneau', '125.5544545', '3656454.4454');
INSERT INTO spots(name, latitude, longitude) VALUES('Le Louvre', '48.8612', '2.3359');
INSERT INTO spots(name, latitude, longitude) VALUES('LBC', '48.8730', '2.3575');
INSERT INTO spots(name, latitude, longitude) VALUES('Pont Neuf', '48.856750', '2.341033');
INSERT INTO spots(name, latitude, longitude) VALUES('Palavas-les-Flots', '43.5339', '3.9289');
INSERT INTO spots(name, latitude, longitude) VALUES('Nantes', '47.2089', '-1.5647');
INSERT INTO spots(name, latitude, longitude) VALUES('Bordeaux', '44.8402', '-0.5775');
INSERT INTO spots(name, latitude, longitude) VALUES('Alpes', '45.9113', '6.8343');
/** Create albums **/
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(2, 'Lacanau1', NOW(), 1);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(4, 'Louvre1', NOW(), 2);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(4, 'LBC', NOW(), 3);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(4, 'Pont Neuf1', NOW(), 4);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(2, 'PLF1', NOW(), 5);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(2, 'Nantes1', NOW(), 6);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(4, 'Bordeaux1', NOW(), 7);
INSERT INTO albums(user_id, name, taken_at, spot_id) VALUES(2, 'Alps1', NOW(), 8);
/** Add pictures to album 1 for spot 'Surf lacanau' **/ 
INSERT INTO pictures(album_id, url) VALUES(1, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mathieu-chirico-JSEn2f96rzY-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(1, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mathieu-chirico-sFSZuKI2CvY-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(1, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/philipp-kammerer-thFqCz8cXu0-unsplash.jpg');
/** Add pictures to album 2 for spot 'Le Louvre' **/ 
INSERT INTO pictures(album_id, url) VALUES(2, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/irina-lediaeva-nHuHQyY0aB4-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(2, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/sebastian-yepes-TwOCH0u-NnI-unsplash.jpg');
/** Add pictures to album 3 for spot 'Le Bon Coin' **/ 
INSERT INTO pictures(album_id, url) VALUES(3, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/leboncoin.jpg');
/** Add pictures to album 4 for spot 'Pont Neuf' **/ 
INSERT INTO pictures(album_id, url) VALUES(4, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/anthony-delanoix-pt4j4bGSPmw-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(4, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/bruno-abatti-mEfIhOTH27w-unsplash.jpg');
/** Add pictures to album 5 for spot Palavas-les-Flots **/ 
INSERT INTO pictures(album_id, url) VALUES(5, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1178869864-612x612.jpg');
INSERT INTO pictures(album_id, url) VALUES(5, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-912925002-612x612.jpg'); 
INSERT INTO pictures(album_id, url) VALUES(5, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mael-balland-1Uz89RFGMpY-unsplash.jpg'); 
/** Add pictures to album 6 for spot Nantes **/ 
INSERT INTO pictures(album_id, url) VALUES(6, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1097012310-612x612.jpg');
INSERT INTO pictures(album_id, url) VALUES(6, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1171570694-612x612.jpg');
INSERT INTO pictures(album_id, url) VALUES(5, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1187975468-612x612.jpg');
/** Add pictures to album 7 for spot Bordeaux **/ 
INSERT INTO pictures(album_id, url) VALUES(7, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/istockphoto-1095826194-612x612.jpg');
INSERT INTO pictures(album_id, url) VALUES(7, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/rich-smith-R1obAiNAD5Y-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(7, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/ryan-ancill-usWBr_oZt4w-unsplash.jpg');
/** Add pictures to album 8 for spot 'Les Alples' **/ 
INSERT INTO pictures(album_id, url) VALUES(8, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/jorg-angeli-cCzeLwUCmnM-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(8, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/markos-mant-F2gTQRAwQ3k-unsplash.jpg');
INSERT INTO pictures(album_id, url) VALUES(8, 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/visit-almaty-wN4D-mVR7fE-unsplash.jpg');
