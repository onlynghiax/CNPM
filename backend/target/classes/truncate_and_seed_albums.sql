SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE albums;
SET FOREIGN_KEY_CHECKS = 1;

-- Seed source of truth is AlbumSeedService.java.
