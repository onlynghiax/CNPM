package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.model.Album;
import com.ecommerce.usermanagement.repository.AlbumRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AlbumSeedService {
    private final AlbumRepository albumRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public AlbumSeedService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Transactional
    public void truncateAndSeedAlbums() {
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0;").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE albums").executeUpdate();
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1;").executeUpdate();

        List<Album> samples = List.of(
                album("DAMN.", "Kendrick Lamar", "Pulitzer-winning modern rap classic.", p("24.99"), "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699", 2017),
                album("To Pimp A Butterfly", "Kendrick Lamar", "Jazz-infused conceptual masterpiece.", p("26.99"), "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1", 2015),
                album("good kid, m.A.A.d city", "Kendrick Lamar", "Cinematic coming-of-age rap story.", p("23.49"), "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797", 2012),
                album("UTOPIA", "Travis Scott", "Grand-scale, atmospheric trap showcase.", p("27.99"), "https://i.scdn.co/image/ab67616d0000b27304481c826dd292e5e4983b3f", 2023),
                album("ASTROWORLD", "Travis Scott", "Theme-park rap fantasy with huge singles.", p("25.99"), "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&q=85", 2018),
                album("Certified Lover Boy", "Drake", "Melodic rap with chart-heavy cuts.", p("24.49"), "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f", 2021),
                album("Graduation", "Kanye West", "Stadium-ready synth rap era.", p("22.99"), "https://i.scdn.co/image/ab67616d0000b273e6ec3b96d448f24facafd376", 2007),
                album("My Beautiful Dark Twisted Fantasy", "Kanye West", "Maximalist modern hip-hop benchmark.", p("28.99"), "https://upload.wikimedia.org/wikipedia/en/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg", 2010),
                album("Donda", "Kanye West", "Spiritual and expansive late-era statement.", p("26.49"), "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85", 2021),
                album("The Eminem Show", "Eminem", "Global rap blockbuster with sharp writing.", p("23.99"), "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg", 2002),
                album("El Dorado", "24kGoldn", "Pop-rap crossover debut.", p("19.99"), "https://i.scdn.co/image/ab67616d0000b273b4141fad9af613c35f55d589", 2021),
                album("The Blueprint", "Jay-Z", "Soul-sampled New York rap essential.", p("24.99"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 2001),
                album("One Million Likes", "Đen Vâu", "Vietnamese rap storytelling record.", p("18.99"), "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85", 2023),

                album("Mr. Morale & The Big Steppers", "Kendrick Lamar", "Introspective double-disc era.", p("25.49"), "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699", 2022),
                album("Section.80", "Kendrick Lamar", "Early socially charged breakout.", p("20.99"), "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1", 2011),
                album("Black Panther: The Album", "Kendrick Lamar", "Blockbuster-curated rap soundtrack.", p("22.49"), "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797", 2018),
                album("Rodeo", "Travis Scott", "Dark and experimental trap debut.", p("22.99"), "https://i.scdn.co/image/ab67616d0000b27304481c826dd292e5e4983b3f", 2015),
                album("Birds In The Trap Sing McKnight", "Travis Scott", "Moody trap with arena hooks.", p("22.49"), "https://i.scdn.co/image/ab67616d0000b27304481c826dd292e5e4983b3f", 2016),
                album("JackBoys", "Travis Scott", "Cactus Jack posse compilation.", p("19.49"), "https://i.scdn.co/image/ab67616d0000b27304481c826dd292e5e4983b3f", 2019),
                album("Take Care", "Drake", "Atmospheric rap-R&B classic.", p("23.49"), "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f", 2011),
                album("Nothing Was The Same", "Drake", "Sleek, confident rap statement.", p("22.99"), "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f", 2013),
                album("Scorpion", "Drake", "Double album pop-rap giant.", p("24.49"), "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f", 2018),
                album("The College Dropout", "Kanye West", "Soul-chipmunk backpack rap classic.", p("22.49"), "https://i.scdn.co/image/ab67616d0000b273e6ec3b96d448f24facafd376", 2004),
                album("Late Registration", "Kanye West", "Orchestral sequel with bigger ambition.", p("22.49"), "https://i.scdn.co/image/ab67616d0000b273e6ec3b96d448f24facafd376", 2005),
                album("Yeezus", "Kanye West", "Industrial and abrasive rap pivot.", p("21.99"), "https://i.scdn.co/image/ab67616d0000b273e6ec3b96d448f24facafd376", 2013),
                album("The Marshall Mathers LP", "Eminem", "Fast-rising controversial classic.", p("23.49"), "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg", 2000),
                album("Recovery", "Eminem", "Mainstream comeback with massive singles.", p("21.99"), "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg", 2010),
                album("Kamikaze", "Eminem", "Rapid-fire response project.", p("20.49"), "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg", 2018),
                album("Illmatic", "Nas", "Foundational East Coast rap classic.", p("24.99"), "https://i.scdn.co/image/ab67616d0000b273b4141fad9af613c35f55d589", 1994),
                album("It Was Written", "Nas", "Polished mafioso-era follow-up.", p("22.99"), "https://i.scdn.co/image/ab67616d0000b273b4141fad9af613c35f55d589", 1996),
                album("King's Disease III", "Nas", "Modern veteran peak run.", p("23.99"), "https://i.scdn.co/image/ab67616d0000b273b4141fad9af613c35f55d589", 2022),
                album("The Chronic", "Dr. Dre", "G-funk blueprint for West Coast rap.", p("24.49"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 1992),
                album("2001", "Dr. Dre", "Late-90s West Coast heavyweight.", p("24.49"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 1999),
                album("Compton", "Dr. Dre", "Cinema-tied modern Dre release.", p("21.49"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 2015),
                album("Reasonable Doubt", "Jay-Z", "Debut hustler classic.", p("24.49"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 1996),
                album("4:44", "Jay-Z", "Reflective and mature lyricism.", p("22.49"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 2017),
                album("American Gangster", "Jay-Z", "Film-inspired conceptual set.", p("21.99"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 2007)
        );

        for (Album album : samples) {
            albumRepository.save(album);
        }
    }

    private static BigDecimal p(String value) {
        return new BigDecimal(value);
    }

    private static Album album(String title, String artist, String description, BigDecimal price, String imageUrl, int year) {
        Album a = new Album();
        a.setTitle(title);
        a.setArtist(artist);
        a.setDescription(description);
        a.setPrice(price);
        a.setImageUrl(imageUrl);
        a.setGenre("Rap");
        a.setReleaseYear(year);
        a.setTracklist("1. Intro\n2. Lead Single\n3. Fan Favorite");
        return a;
    }
}
