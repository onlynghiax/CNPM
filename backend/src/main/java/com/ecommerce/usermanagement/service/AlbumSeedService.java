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
                album("DAMN.", "Kendrick Lamar", "Pulitzer-winning modern rap classic.", p("24.99"), "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png", 2017),
                album("To Pimp A Butterfly", "Kendrick Lamar", "Jazz-infused conceptual masterpiece.", p("26.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music7/v4/58/11/61/58116127-1059-503d-3108-a26bcc064cf5/886445361667.jpg/600x600bb.jpg", 2015),
                album("good kid, m.A.A.d city", "Kendrick Lamar", "Cinematic coming-of-age rap story.", p("23.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/36/86/ec/3686ec99-dec4-0a01-8b74-2d8a9a0263a7/12UMGIM52988.rgb.jpg/600x600bb.jpg", 2012),
                album("UTOPIA", "Travis Scott", "Grand-scale, atmospheric trap showcase.", p("27.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/66/90/306690d4-2a29-402e-e406-6b319ce7731a/886447227169.jpg/600x600bb.jpg", 2023),
                album("ASTROWORLD", "Travis Scott", "Theme-park rap fantasy with huge singles.", p("25.99"), "https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg", 2018),
                album("Certified Lover Boy", "Drake", "Melodic rap with chart-heavy cuts.", p("24.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cb/6b/5f/cb6b5fc3-8d35-908a-18e6-6f8eda46ce11/21UM1IM07521.rgb.jpg/600x600bb.jpg", 2021),
                album("Graduation", "Kanye West", "Stadium-ready synth rap era.", p("22.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/39/25/2d/39252d65-2d50-b991-0962-f7a98a761271/00602517483507.rgb.jpg/600x600bb.jpg", 2007),
                album("My Beautiful Dark Twisted Fantasy", "Kanye West", "Maximalist modern hip-hop benchmark.", p("28.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/37/da/7c/37da7cc5-2b6f-9bb8-30ba-8a8c3be3e16a/00602527584973.rgb.jpg/600x600bb.jpg", 2010),
                album("Donda", "Kanye West", "Spiritual and expansive late-era statement.", p("26.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/62/13/7b/62137b3f-7722-59f5-2ee1-b5aff9426869/21UMGIM64738.rgb.jpg/600x600bb.jpg", 2021),
                album("The Eminem Show", "Eminem", "Global rap blockbuster with sharp writing.", p("23.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/dd/5c/e6/dd5ce621-f7d2-f767-7a08-e7a7eaa7870b/00602537526994.rgb.jpg/600x600bb.jpg", 2002),
                album("El Dorado", "24kGoldn", "Pop-rap crossover debut.", p("19.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ac/fe/35/acfe3571-3872-92c6-e208-072fe362d7c3/886449095070.jpg/600x600bb.jpg", 2021),
                album("The Blueprint", "Jay-Z", "Soul-sampled New York rap essential.", p("24.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/19/c0/e3/19c0e3b6-4c2f-17ee-2a4a-6e2208de8aa6/00857366006951.rgb.jpg/600x600bb.jpg", 2001),
                album("One Million Likes", "Đen Vâu", "Vietnamese rap storytelling record.", p("18.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a9/73/fd/a973fdd9-670e-a2c8-5e09-61a32727f6cf/cover.jpg/600x600bb.jpg", 2023),

                album("Mr. Morale & The Big Steppers", "Kendrick Lamar", "Introspective double-disc era.", p("25.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/6b/17/e6/6b17e679-70e0-e00e-93e1-5af4d25ee8c8/22UMGIM52376.rgb.jpg/600x600bb.jpg", 2022),
                album("Section.80", "Kendrick Lamar", "Early socially charged breakout.", p("20.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/85/d6/cc/85d6cc27-85f2-6bfe-dca7-a966e2bc0cee/00602557378047.rgb.jpg/600x600bb.jpg", 2011),
                album("Black Panther: The Album", "Kendrick Lamar", "Blockbuster-curated rap soundtrack.", p("22.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4d/16/55/4d165549-3d11-86dc-fcbf-be7fe0bcadfb/18UMGIM00002.rgb.jpg/600x600bb.jpg", 2018),
                album("Rodeo", "Travis Scott", "Dark and experimental trap debut.", p("22.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/66/90/306690d4-2a29-402e-e406-6b319ce7731a/886447227169.jpg/600x600bb.jpg", 2015),
                album("Birds In The Trap Sing McKnight", "Travis Scott", "Moody trap with arena hooks.", p("22.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b8/e5/27/b8e527c8-aaf4-c7b7-5562-c479458ed7d9/886446092645.jpg/600x600bb.jpg", 2016),
                album("JackBoys", "Travis Scott", "Cactus Jack posse compilation.", p("19.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/66/90/306690d4-2a29-402e-e406-6b319ce7731a/886447227169.jpg/600x600bb.jpg", 2019),
                album("Take Care", "Drake", "Atmospheric rap-R&B classic.", p("23.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d2/53/62/d2536245-b94c-b3fd-7168-9512f655f6d4/00602527899091.rgb.jpg/600x600bb.jpg", 2011),
                album("Nothing Was The Same", "Drake", "Sleek, confident rap statement.", p("22.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/60/e8/d1/60e8d144-2b8e-cbdc-9ff8-beaf9f4868b1/00602537542345.rgb.jpg/600x600bb.jpg", 2013),
                album("Scorpion", "Drake", "Double album pop-rap giant.", p("24.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg/600x600bb.jpg", 2018),
                album("The College Dropout", "Kanye West", "Soul-chipmunk backpack rap classic.", p("22.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/0d/73/b1/0d73b181-2716-f7a6-a340-0a3f81eacfb9/06UMGIM15686.rgb.jpg/600x600bb.jpg", 2004),
                album("Late Registration", "Kanye West", "Orchestral sequel with bigger ambition.", p("22.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0e/90/3c/0e903c43-9d81-f91b-90f1-727a58f7fb2c/00602498824030.rgb.jpg/600x600bb.jpg", 2005),
                album("Yeezus", "Kanye West", "Industrial and abrasive rap pivot.", p("21.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4d/75/2d/4d752db1-022d-f65d-40a1-a2390f01427a/13UAEIM26465.rgb.jpg/600x600bb.jpg", 2013),
                album("The Marshall Mathers LP", "Eminem", "Fast-rising controversial classic.", p("23.49"), "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg", 2000),
                album("Recovery", "Eminem", "Mainstream comeback with massive singles.", p("21.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/41/74/2f/41742f85-6c76-0918-3153-e725e2ab05c4/13UAEIM36000.rgb.jpg/600x600bb.jpg", 2010),
                album("Kamikaze", "Eminem", "Rapid-fire response project.", p("20.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/03/c2/54/03c2540d-b9f3-9807-b429-da23cbb854a2/00602577046421.rgb.jpg/600x600bb.jpg", 2018),
                album("Illmatic", "Nas", "Foundational East Coast rap classic.", p("24.99"), "https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg", 1994),
                album("It Was Written", "Nas", "Polished mafioso-era follow-up.", p("22.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ec/9d/72/ec9d7249-6d71-6ade-201e-cc2a85f09f86/06UMGIM09156.rgb.jpg/600x600bb.jpg", 1996),
                album("King's Disease III", "Nas", "Modern veteran peak run.", p("23.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/af/35/46/af3546db-c312-a52b-3a19-c2aa2c513d81/20UMGIM72779.rgb.jpg/600x600bb.jpg", 2022),
                album("The Chronic", "Dr. Dre", "G-funk blueprint for West Coast rap.", p("24.49"), "https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg", 1992),
                album("2001", "Dr. Dre", "Late-90s West Coast heavyweight.", p("24.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/27/6b/4c/276b4c69-99cb-6209-2fd8-3edd17ccfd06/00602517641228.rgb.jpg/600x600bb.jpg", 1999),
                album("Compton", "Dr. Dre", "Cinema-tied modern Dre release.", p("21.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/36/86/ec/3686ec99-dec4-0a01-8b74-2d8a9a0263a7/12UMGIM52988.rgb.jpg/600x600bb.jpg", 2015),
                album("Reasonable Doubt", "Jay-Z", "Debut hustler classic.", p("24.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f8/30/98/f83098de-bc21-7434-04bc-e95b929eebf8/21UMGIM79734.rgb.jpg/600x600bb.jpg", 1996),
                album("4:44", "Jay-Z", "Reflective and mature lyricism.", p("22.49"), "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ee/d1/da/eed1da86-9e2f-a19b-498a-f03622b183b2/00854242007569.rgb.jpg/600x600bb.jpg", 2017),
                album("American Gangster", "Jay-Z", "Film-inspired conceptual set.", p("21.99"), "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/54/4e/60/544e605d-62d8-34ce-1080-f675960e3e48/00602517501225.rgb.jpg/600x600bb.jpg", 2007)
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
