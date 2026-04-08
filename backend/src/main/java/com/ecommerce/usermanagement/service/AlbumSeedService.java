package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.model.Album;
import com.ecommerce.usermanagement.repository.AlbumRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        entityManager.createNativeQuery("TRUNCATE TABLE cart_items").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE orders").executeUpdate();
        try {
            entityManager.createNativeQuery("TRUNCATE TABLE album_tracks").executeUpdate();
        } catch (Exception e) {
            // Skip if table isn't created yet by Hibernate
        }
        entityManager.createNativeQuery("TRUNCATE TABLE albums").executeUpdate();
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1;").executeUpdate();

        List<Album> samples = List.of(
                album("DAMN.", "Kendrick Lamar", "Pulitzer-winning modern rap classic.", p("24.99"), "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png", 2017,
                        tracks("BLOOD.", "DNA.", "YAH.", "ELEMENT.", "FEEL.", "LOYALTY. FEAT. RIHANNA.", "PRIDE.", "HUMBLE.", "LUST.", "LOVE. FEAT. ZACARI.", "XXX. FEAT. U2.", "FEAR.", "GOD.", "DUCKWORTH.")),
                
                album("ASTROWORLD", "Travis Scott", "Theme-park rap fantasy with huge singles.", p("25.99"), "https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg", 2018,
                        tracks("STARGAZING", "CAROUSEL", "SICKO MODE", "R.I.P. SCREW", "STOP TRYING TO BE GOD", "NO BYSTANDERS", "SKELETONS", "WAKE UP", "5% TINT", "NC-17", "ASTROTHUNDER", "YOSEMITE", "CAN'T SAY", "WHO? WHAT!", "BUTTERFLY EFFECT", "HOUSTONFORNICATION", "COFFEE BEAN")),
                
                album("Illmatic", "Nas", "Foundational East Coast rap classic.", p("24.99"), "https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg", 1994,
                        tracks("The Genesis", "N.Y. State of Mind", "Life's a Bitch", "The World Is Yours", "Halftime", "Memory Lane (Sittin' in da Park)", "One Love", "One Time 4 Your Mind", "Represent", "It Ain't Hard to Tell")),
                
                album("The Marshall Mathers LP", "Eminem", "Fast-rising controversial classic.", p("23.49"), "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg", 2000,
                        tracks("Public Service Announcement 2000", "Kill You", "Stan", "Paul (Skit)", "Who Knew", "Steve Berman (Skit)", "The Way I Am", "The Real Slim Shady", "Remember Me?", "I'm Back", "Marshall Mathers", "Ken Kaniff (Skit)", "Drug Ballad", "Amityville", "Bitch Please II", "Kim", "Under the Influence", "Criminal")),
                
                album("UTOPIA", "Travis Scott", "Grand-scale, atmospheric trap showcase.", p("27.99"), "https://upload.wikimedia.org/wikipedia/en/2/23/Travis_Scott_-_Utopia.png", 2023,
                        tracks("HYAENA", "THANK GOD", "MODERN JAM", "MY EYES", "GOD'S COUNTRY", "SIRENS", "MELTDOWN", "FE!N", "DELRESTO (ECHOES)", "I KNOW ?", "TOPIA TWINS", "CIRCUS MAXIMUS", "PARASAIL", "SKITZO", "LOST FOREVER", "LOOOVE", "K-POP", "TELEKINESIS", "TIL FURTHER NOTICE")),

                album("The Chronic", "Dr. Dre", "G-funk blueprint for West Coast rap.", p("24.49"), "https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg", 1992,
                        tracks("The Chronic (Intro)", "Fuck wit Dre Day (And Everybody's Celebratin')", "Let Me Ride", "The Day the Niggaz Took Over", "Nuthin' but a 'G' Thang", "Deeez Nuuuts", "Lil' Ghetto Boy", "A Nigga Witta Gun", "Rat-Tat-Tat-Tat", "The $20 Sack Pyramid (Skit)", "Lyrical Gangbang", "High Powered", "The Doctor's Office (Skit)", "Stranded on Death Row", "The Roach (The Chronic Outro)", "Bitches Ain't Shit")),

                album("Get Rich or Die Tryin'", "50 Cent", "The definitive 2000s gangsta rap blockbuster.", p("21.99"), "https://upload.wikimedia.org/wikipedia/en/9/9d/Get_Rich_Or_Die_Tryin%27.jpg", 2003,
                        tracks("Intro", "What Up Gangsta", "Patiently Waiting", "Many Men (Wish Death)", "In Da Club", "High All the Time", "Heat", "If I Can't", "Blood Hound", "Back Down", "P.I.M.P.", "Like My Style", "Poor Lil Rich", "21 Questions", "Don't Push Me", "Gotta Make It to Heaven", "Wanksta", "U Not Like Me", "Life's on the Line")),
                
                album("To Pimp A Butterfly", "Kendrick Lamar", "Jazz-infused conceptual masterpiece.", p("26.99"), "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png", 2015,
                        tracks("Wesley's Theory", "For Free? (Interlude)", "King Kunta", "Institutionalized", "These Walls", "u", "Alright", "For Sale? (Interlude)", "Momma", "Hood Politics", "How Much a Dollar Cost", "Complexion (A Zulu Love)", "The Blacker the Berry", "You Ain't Gotta Lie (Momma Said)", "i", "Mortal Man")),

                album("The College Dropout", "Kanye West", "Soul-chipmunk backpack rap classic.", p("22.49"), "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg", 2004,
                        tracks("Intro", "We Don't Care", "Graduation Day", "All Falls Down", "I'll Fly Away", "Spaceship", "Jesus Walks", "Never Let Me Down", "Get Em High", "Workout Plan", "The New Workout Plan", "Slow Jamz", "Breathe In Breathe Out", "School Spirit Skit 1", "School Spirit", "School Spirit Skit 2", "Lil Jimmy Skit", "Two Words", "Through the Wire", "Family Business", "Last Call")),

                album("Graduation", "Kanye West", "Stadium-ready synth rap era.", p("22.99"), "https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg", 2007,
                        tracks("Good Morning", "Champion", "Stronger", "I Wonder", "Good Life", "Can't Tell Me Nothing", "Barry Bonds", "Drunk and Hot Girls", "Flashing Lights", "Everything I Am", "The Glory", "Homecoming", "Big Brother")),
                
                album("The Blueprint", "Jay-Z", "Soul-sampled New York rap essential.", p("24.99"), "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", 2001,
                        tracks("The Ruler's Back", "Takeover", "Izzo (H.O.V.A.)", "Girls, Girls, Girls", "Jigga That Nigga", "U Don't Know", "Hola' Hovito", "Heart of the City (Ain't No Love)", "Never Change", "Song Cry", "All I Need", "Renegade", "Blueprint (Momma Loves Me)", "Breathe Easy (Lyrical Exercise)", "Girls, Girls, Girls (Part 2)")),

                album("My Beautiful Dark Twisted Fantasy", "Kanye West", "Maximalist modern hip-hop benchmark.", p("28.99"), "https://upload.wikimedia.org/wikipedia/en/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg", 2010,
                        tracks("Dark Fantasy", "Gorgeous", "POWER", "All of the Lights (Interlude)", "All of the Lights", "Monster", "So Appalled", "Devil in a New Dress", "Runaway", "Hell of a Life", "Blame Game", "Lost in the World", "Who Will Survive in America")),
                
                album("good kid, m.A.A.d city", "Kendrick Lamar", "Cinematic coming-of-age rap story.", p("23.49"), "https://upload.wikimedia.org/wikipedia/en/8/86/Kendrick_Lamar_-_Good_Kid%2C_M.A.A.D_City.jpg", 2012,
                        tracks("Sherane a.k.a Master Splinter's Daughter", "Bitch, Don't Kill My Vibe", "Backseat Freestyle", "The Art of Peer Pressure", "Money Trees", "Poetic Justice", "good kid", "m.A.A.d city", "Swimming Pools (Drank)", "Sing About Me, I'm Dying of Thirst", "Real", "Compton")),
                        
                album("2014 Forest Hills Drive", "J. Cole", "A soulful, featureless modern classic.", p("21.99"), "https://upload.wikimedia.org/wikipedia/en/2/2a/2014ForestHillsDrive.jpg", 2014,
                        tracks("Intro", "January 28th", "Wet Dreamz", "'03 Adolescence", "A Tale of 2 Citiez", "Fire Squad", "St. Tropez", "G.O.M.D.", "No Role Modelz", "Hello", "Apparently", "Love Yourz", "Note to Self")),
                        
                album("All Eyez on Me", "2Pac", "The definitive gangsta rap double album.", p("29.99"), "https://upload.wikimedia.org/wikipedia/en/1/16/Alleyezonme.jpg", 1996,
                        tracks("Ambitionz Az a Ridah", "All Bout U", "Skandalouz", "Got My Mind Made Up", "How Do U Want It", "2 of Amerikaz Most Wanted", "No More Pain", "Heartz of Men", "Life Goes On", "Only God Can Judge Me", "Tradin War Stories", "California Love (Remix)", "I Ain't Mad at Cha", "What'z Ya Phone #", "Can't C Me", "Shorty Wanna Be a Thug", "Holla at Me", "Wonda Why They Call U Bytch", "When We Ride", "Thug Passion", "Picture Me Rollin'", "Check Out Time", "Ratha Be Ya Nigga", "All Eyez on Me", "Run Tha Streetz", "Ain't Hard 2 Find", "Heaven Ain't Hard 2 Find"))
        );

        for (Album album : samples) {
            albumRepository.save(album);
        }
    }

    private static BigDecimal p(String value) {
        return new BigDecimal(value);
    }

    private static List<Album.Track> tracks(String... names) {
        return Arrays.stream(names)
                // Easter Egg: Rickroll hijacked preview URLs via MP3
                .map(name -> new Album.Track(name, "https://www.myinstants.com/media/sounds/never-gonna-give-you-up.mp3"))
                .collect(Collectors.toList());
    }

    private static Album album(String title, String artist, String description, BigDecimal price, String imageUrl, int year, List<Album.Track> tracklist) {
        Album a = new Album();
        a.setTitle(title);
        a.setArtist(artist);
        a.setDescription(description);
        a.setPrice(price);
        a.setImageUrl(imageUrl);
        a.setGenre("Rap");
        a.setReleaseYear(year);
        a.setTracklist(tracklist);
        return a;
    }
}
