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

    /**
     * Wipes legacy rows and inserts the BadGenius rap catalog (MySQL TRUNCATE).
     */
    @Transactional
    public void truncateAndSeedAlbums() {
        entityManager.createNativeQuery("TRUNCATE TABLE albums").executeUpdate();

        List<Album> samples = List.of(
                album(
                        "DAMN.",
                        "Kendrick Lamar",
                        "Pulitzer Prize–winning rap opus balancing bravado and vulnerability; home to HUMBLE., DNA., and FEAR.",
                        new BigDecimal("24.99"),
                        "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699",
                        "Rap",
                        2017,
                        "1. BLOOD.\n2. DNA.\n3. YAH.\n4. ELEMENT.\n5. FEEL.\n6. LOYALTY.\n7. PRIDE.\n8. HUMBLE.\n9. LUST.\n10. LOVE.\n11. XXX.\n12. FEAR.\n13. GOD.\n14. DUCKWORTH."
                ),
                album(
                        "To Pimp A Butterfly",
                        "Kendrick Lamar",
                        "Jazz-soaked West Coast masterpiece on identity and survival; features King Kunta and Alright.",
                        new BigDecimal("26.99"),
                        "https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1",
                        "Rap",
                        2015,
                        "1. Wesley's Theory\n2. For Free?\n3. King Kunta\n4. Institutionalized\n5. These Walls\n6. u\n7. Alright\n8. For Sale?\n9. Momma\n10. Hood Politics"
                ),
                album(
                        "good kid, m.A.A.d city",
                        "Kendrick Lamar",
                        "Cinematic Compton bildungsroman with Dre-sized hooks; the van scene became instant canon.",
                        new BigDecimal("23.49"),
                        "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797",
                        "Rap",
                        2012,
                        "1. Sherane\n2. Bitch, Don't Kill My Vibe\n3. Backseat Freestyle\n4. The Art of Peer Pressure\n5. Money Trees\n6. Poetic Justice\n7. good kid\n8. m.A.A.d city\n9. Swimming Pools (Drank)\n10. Sing About Me / I'm Dying Of Thirst"
                ),
                album(
                        "UTOPIA",
                        "Travis Scott",
                        "Arena-scale trap from Cactus Jack; cinematic sequencing with blockbuster features and IMAX-ready drops.",
                        new BigDecimal("27.99"),
                        "https://i.scdn.co/image/ab67616d0000b27304481c826dd292e5e4983b3f",
                        "Rap",
                        2023,
                        "1. HYAENA\n2. THANK GOD\n3. MODERN JAM\n4. MY EYES\n5. GOD'S COUNTRY\n6. SIRENS\n7. MELTDOWN\n8. FE!N\n9. DELRESTO (ECHOES)\n10. I KNOW ?"
                ),
                album(
                        "ASTROWORLD",
                        "Travis Scott",
                        "Theme-park maximalism with psychedelic drops; a Houston love letter built for festival-sized speakers.",
                        new BigDecimal("25.99"),
                        "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&q=85",
                        "Rap",
                        2018,
                        "1. STARGAZING\n2. CAROUSEL\n3. SICKO MODE\n4. R.I.P. SCREW\n5. STOP TRYING TO BE GOD\n6. NO BYSTANDERS\n7. SKELETONS\n8. WAKE UP\n9. 5% TINT\n10. NC-17"
                ),
                album(
                        "Certified Lover Boy",
                        "Drake",
                        "OVO mood-board rap with chart-topping confessionals; Champagne Poetry opens a marathon runtime.",
                        new BigDecimal("24.49"),
                        "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f",
                        "Rap",
                        2021,
                        "1. Champagne Poetry\n2. Papi's Home\n3. Girls Want Girls\n4. In My Feelings\n5. Fair Trade\n6. Way 2 Sexy\n7. Knife Talk\n8. 7am On Bridle Path\n9. Race My Mind\n10. The Remorse"
                ),
                album(
                        "Graduation",
                        "Kanye West",
                        "Stadium-rap third act with Daft Punk shimmer; Stronger and Flashing Lights remain festival staples.",
                        new BigDecimal("22.99"),
                        "https://i.scdn.co/image/ab67616d0000b273e6ec3b96d448f24facafd376",
                        "Rap",
                        2007,
                        "1. Good Morning\n2. Champion\n3. Stronger\n4. I Wonder\n5. Good Life\n6. Can't Tell Me Nothing\n7. Barry Bonds\n8. Drunk and Hot Girls\n9. Flashing Lights\n10. Everything I Am"
                ),
                album(
                        "My Beautiful Dark Twisted Fantasy",
                        "Kanye West",
                        "Baroque maximalist rap opus with layered vocals and prog ambition; a decade-defining event release.",
                        new BigDecimal("28.99"),
                        "https://upload.wikimedia.org/wikipedia/en/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg",
                        "Rap",
                        2010,
                        "1. Dark Fantasy\n2. Gorgeous\n3. POWER\n4. All Of The Lights\n5. Monster\n6. So Appalled\n7. Devil In A New Dress\n8. Runaway\n9. Hell Of A Life\n10. Blame Game"
                ),
                album(
                        "Donda",
                        "Kanye West",
                        "Church-inflected marathon named for Kanye's mother; immersive Sunday Service energy and arena choirs.",
                        new BigDecimal("26.49"),
                        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85",
                        "Rap",
                        2021,
                        "1. Donda Chant\n2. Hurricane\n3. Moon\n4. Life Of The Party\n5. Jonestown (Interlude)\n6. Believe What I Say\n7. 24\n8. Jail\n9. Ok Ok\n10. Jesus Lord"
                ),
                album(
                        "The Eminem Show",
                        "Eminem",
                        "Multi-platinum blockbuster blending shock-rap theater with stadium hooks; The Real Slim Shady’s world stage.",
                        new BigDecimal("23.99"),
                        "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg",
                        "Rap",
                        2002,
                        "1. White America\n2. Business\n3. Cleanin' Out My Closet\n4. Square Dance\n5. The Kiss (Skit)\n6. Soldier\n7. Say My Name\n8. Without Me\n9. Sing For The Moment\n10. Superman"
                ),
                album(
                        "El Dorado",
                        "24kGoldn",
                        "Debut studio album blending melodic rap and pop-punk energy; includes the global smash Mood.",
                        new BigDecimal("19.99"),
                        "https://i.scdn.co/image/ab67616d0000b273b4141fad9af613c35f55d589",
                        "Rap",
                        2021,
                        "1. The Top\n2. Company\n3. Love Or Lust\n4. Outta Pocket\n5. Coco\n6. Butterflies\n7. Breath Away\n8. Yellow Lights\n9. 3, 2, 1\n10. Mood"
                ),
                album(
                        "The Blueprint",
                        "Jay-Z",
                        "Soul-sample Roc-A-Fella classic; lyrical exercise over warm chops with near-universal acclaim.",
                        new BigDecimal("24.99"),
                        "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png",
                        "Rap",
                        2001,
                        "1. The Ruler's Back\n2. Takeover\n3. Izzo (H.O.V.A.)\n4. Girls, Girls, Girls\n5. U Don't Know\n6. Hola' Hovito\n7. Heart Of The City (Ain't No Love)\n8. Never Change\n9. Song Cry\n10. All I Need"
                ),
                album(
                        "One Million Likes",
                        "\u0110en V\u00e2u",
                        "Vietnamese rap storytelling with warm live instrumentation; viral hooks built for headphone daydreams.",
                        new BigDecimal("18.99"),
                        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85",
                        "Rap",
                        2023,
                        "1. Opening Scene\n2. One Million Likes\n3. Live Band Suite\n4. Night Ride\n5. Credits"
                )
        );

        albumRepository.saveAll(samples);
    }

    private static Album album(
            String title,
            String artist,
            String description,
            BigDecimal price,
            String imageUrl,
            String genre,
            int releaseYear,
            String tracklist
    ) {
        Album a = new Album();
        a.setTitle(title);
        a.setArtist(artist);
        a.setDescription(description);
        a.setPrice(price);
        a.setImageUrl(imageUrl);
        a.setGenre(genre);
        a.setReleaseYear(releaseYear);
        a.setTracklist(tracklist);
        return a;
    }
}
