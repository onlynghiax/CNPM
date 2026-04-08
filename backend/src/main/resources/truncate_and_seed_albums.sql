-- BadGenius: wipe legacy rows and load the rap catalog (MySQL).
-- Run manually in MySQL Workbench if you prefer not to use the Java seeder.

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE albums;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO albums (title, artist, description, price, image_url, genre, release_year, tracklist) VALUES
('DAMN.', 'Kendrick Lamar', 'Pulitzer Prize–winning rap opus.', 24.99,
 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', 'Rap', 2017,
 '1. BLOOD.\n2. DNA.\n3. HUMBLE.'),
('To Pimp A Butterfly', 'Kendrick Lamar', 'Jazz-soaked West Coast masterpiece.', 26.99,
 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1', 'Rap', 2015,
 '1. King Kunta\n2. Alright'),
('good kid, m.A.A.d city', 'Kendrick Lamar', 'Cinematic Compton bildungsroman.', 23.49,
 'https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797', 'Rap', 2012,
 '1. Money Trees\n2. Swimming Pools (Drank)'),
('UTOPIA', 'Travis Scott', 'Arena-scale trap from Cactus Jack.', 27.99,
 'https://i.scdn.co/image/ab67616d0000b27304481c826dd292e5e4983b3f', 'Rap', 2023,
 '1. HYAENA\n2. FE!N'),
('ASTROWORLD', 'Travis Scott', 'Theme-park maximalism.', 25.99,
 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&q=85', 'Rap', 2018,
 '1. STARGAZING\n2. SICKO MODE'),
('Certified Lover Boy', 'Drake', 'OVO mood-board rap.', 24.49,
 'https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f', 'Rap', 2021,
 '1. Champagne Poetry\n2. Fair Trade'),
('Graduation', 'Kanye West', 'Stadium-rap third act.', 22.99,
 'https://i.scdn.co/image/ab67616d0000b273e6ec3b96d448f24facafd376', 'Rap', 2007,
 '1. Stronger\n2. Flashing Lights'),
('My Beautiful Dark Twisted Fantasy', 'Kanye West', 'Baroque maximalist rap opus.', 28.99,
 'https://upload.wikimedia.org/wikipedia/en/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg', 'Rap', 2010,
 '1. POWER\n2. Runaway'),
('Donda', 'Kanye West', 'Church-inflected marathon.', 26.49,
 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85', 'Rap', 2021,
 '1. Hurricane\n2. Moon'),
('The Eminem Show', 'Eminem', 'Multi-platinum blockbuster.', 23.99,
 'https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg', 'Rap', 2002,
 '1. Without Me\n2. Till I Collapse'),
('El Dorado', '24kGoldn', 'Debut studio album with Mood.', 19.99,
 'https://i.scdn.co/image/ab67616d0000b273b4141fad9af613c35f55d589', 'Rap', 2021,
 '1. Mood\n2. Coco'),
('The Blueprint', 'Jay-Z', 'Soul-sample Roc-A-Fella classic.', 24.99,
 'https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png', 'Rap', 2001,
 '1. Takeover\n2. Song Cry'),
('One Million Likes', 'Đen Vâu', 'Vietnamese rap storytelling.', 18.99,
 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85', 'Rap', 2023,
 '1. One Million Likes\n2. Night Ride');
