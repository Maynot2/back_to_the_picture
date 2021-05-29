\c back_to_the_pictures; 
/** Create users **/
INSERT INTO users(name, email, role) VALUES('Thibaut', 'thibaut@sfr.fr', 'admin');
INSERT INTO users(name, email, role) VALUES('Franck', 'franck@google.fr', 'user');
INSERT INTO users(name, email, role) VALUES('Huy', 'huy@google.fr', 'admin');
/** Create spots ***/
INSERT INTO spots(name, latitude, longitude) VALUES('Surf la caneau', '125.5544545', '3656454.4454');
INSERT INTO spots(name, latitude, longitude) VALUES('Tour eiffel', '48.8584', '2.2945');
INSERT INTO spots(name, latitude, longitude) VALUES('Champs-Elysées', '48.869745', '2.307946');
INSERT INTO spots(name, latitude, longitude) VALUES('Montmartre', '48.8925', '2.3444');
INSERT INTO spots(name, latitude, longitude) VALUES('Pont Neuf', '48.856750', '2.341033');
/** Create albums **/
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(1, NOW(), 1);
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(1, NOW(), 1);
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(2, NOW(), 3);
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(2, NOW(), 3);
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(2, NOW(), 3);
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(2, NOW(), 3);
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(2, NOW(), 2);
/** Create one album for Pont Neuf spot**/
INSERT INTO albums(user_id, taken_at, spot_id) VALUES(3, NOW(), 5);

/** Add pictures to album 5 for spot champs-elysées **/ 
INSERT INTO pictures(album_id, name, url) VALUES(5, 'photoChamp1', 'http://champ1');
INSERT INTO pictures(album_id, name, url) VALUES(5, 'photoChamp2', 'http://champ2');
INSERT INTO pictures(album_id, name, url) VALUES(5, 'photoChamp3', 'http://champ3');
INSERT INTO pictures(album_id, name, url) VALUES(5, 'photoChamp4', 'http://champ4');
INSERT INTO pictures(album_id, name, url) VALUES(5, 'photoChamp5', 'http://champ5');
INSERT INTO pictures(album_id, name, url) VALUES(5, 'photoChamp6', 'http://champ6');

/** Add pictures to album 1 for spot 'Surf la caneau' **/ 
INSERT INTO pictures(album_id, name, url) VALUES(1, 'photoCaneau1', 'http://caneau1');
INSERT INTO pictures(album_id, name, url) VALUES(1, 'photoCaneau2', 'http://caneau2');
INSERT INTO pictures(album_id, name, url) VALUES(1, 'photoCaneau3', 'http://caneau3');

/** Add pictures to album 7 for spot 'Tour eiffel' **/ 
INSERT INTO pictures(album_id, name, url) VALUES(1, 'photoEiffel1', 'http://eiffel1');

/** Add pictures to album 8 for spot 'Pont Neuf' **/ 
INSERT INTO pictures(album_id, name, url) VALUES(8, 'photoPontNeuf', 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/anthony-delanoix-pt4j4bGSPmw-unsplash.jpg');

