package com.ecommerce.usermanagement.config;

import com.ecommerce.usermanagement.service.AlbumSeedService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AlbumSampleDataLoader implements CommandLineRunner {

    @Value("${app.albums.truncate-and-seed-on-startup:true}")
    private boolean truncateAndSeedOnStartup;

    private final AlbumSeedService albumSeedService;

    public AlbumSampleDataLoader(AlbumSeedService albumSeedService) {
        this.albumSeedService = albumSeedService;
    }

    @Override
    public void run(String... args) {
        if (!truncateAndSeedOnStartup) {
            return;
        }
        albumSeedService.truncateAndSeedAlbums();
    }
}
