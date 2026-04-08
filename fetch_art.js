const fs = require('fs');
const https = require('https');

const albums = [
    { title: "DAMN.", artist: "Kendrick Lamar" },
    { title: "To Pimp A Butterfly", artist: "Kendrick Lamar" },
    { title: "good kid, m.A.A.d city", artist: "Kendrick Lamar" },
    { title: "UTOPIA", artist: "Travis Scott" },
    { title: "ASTROWORLD", artist: "Travis Scott" },
    { title: "Certified Lover Boy", artist: "Drake" },
    { title: "Graduation", artist: "Kanye West" },
    { title: "My Beautiful Dark Twisted Fantasy", artist: "Kanye West" },
    { title: "Donda", artist: "Kanye West" },
    { title: "The Eminem Show", artist: "Eminem" },
    { title: "El Dorado", artist: "24kGoldn" },
    { title: "The Blueprint", artist: "Jay-Z" },
    { title: "One Million Likes", artist: "Đen Vâu" },
    { title: "Mr. Morale & The Big Steppers", artist: "Kendrick Lamar" },
    { title: "Section.80", artist: "Kendrick Lamar" },
    { title: "Black Panther: The Album", artist: "Kendrick Lamar" },
    { title: "Rodeo", artist: "Travis Scott" },
    { title: "Birds In The Trap Sing McKnight", artist: "Travis Scott" },
    { title: "JackBoys", artist: "Travis Scott" },
    { title: "Take Care", artist: "Drake" },
    { title: "Nothing Was The Same", artist: "Drake" },
    { title: "Scorpion", artist: "Drake" },
    { title: "The College Dropout", artist: "Kanye West" },
    { title: "Late Registration", artist: "Kanye West" },
    { title: "Yeezus", artist: "Kanye West" },
    { title: "The Marshall Mathers LP", artist: "Eminem" },
    { title: "Recovery", artist: "Eminem" },
    { title: "Kamikaze", artist: "Eminem" },
    { title: "Illmatic", artist: "Nas" },
    { title: "It Was Written", artist: "Nas" },
    { title: "King's Disease III", artist: "Nas" },
    { title: "The Chronic", artist: "Dr. Dre" },
    { title: "2001", artist: "Dr. Dre" },
    { title: "Compton", artist: "Dr. Dre" },
    { title: "Reasonable Doubt", artist: "Jay-Z" },
    { title: "4:44", artist: "Jay-Z" },
    { title: "American Gangster", artist: "Jay-Z" }
];

const specificUrls = {
    "DAMN.": "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
    "ASTROWORLD": "https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg",
    "Illmatic": "https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg",
    "The Chronic": "https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg",
    "The Marshall Mathers LP": "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg"
};

function fetchArtwork(title, artist) {
    return new Promise((resolve) => {
        if (specificUrls[title]) {
            return resolve({ title, url: specificUrls[title] });
        }
        
        let query = encodeURIComponent(`${title} ${artist}`);
        if(title === "One Million Likes" && artist === "Đen Vâu") {
            query = encodeURIComponent(`Den Một Triệu Like`);
        }
        const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.results && json.results.length > 0) {
                        const artwork = json.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
                        resolve({ title, url: artwork });
                    } else {
                        // fallback album search
                        const url2 = `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`;
                        https.get(url2, (res2) => {
                            let data2 = '';
                            res2.on('data', chunk => data2 += chunk);
                            res2.on('end', () => {
                                try {
                                    const json2 = JSON.parse(data2);
                                    if (json2.results && json2.results.length > 0) {
                                        resolve({ title, url: json2.results[0].artworkUrl100.replace('100x100bb', '600x600bb') });
                                    } else {
                                        resolve({ title, url: null });
                                    }
                                } catch(e) { resolve({ title, url: null }); }
                            });
                        });
                    }
                } catch(e) {
                    resolve({ title, url: null });
                }
            });
        }).on('error', () => resolve({ title, url: null }));
    });
}

async function run() {
    let serviceCode = fs.readFileSync('backend/src/main/java/com/ecommerce/usermanagement/service/AlbumSeedService.java', 'utf8');

    for (const a of albums) {
        let res = await fetchArtwork(a.title, a.artist);
        // Sometimes "Đen Vâu" needs manual URL if it fails on iTunes
        if (!res.url && a.title === "One Million Likes") {
            res.url = "https://i.scdn.co/image/ab67616d0000b273b75ab9394fcded902abecae5";
        }
        const finalUrl = res.url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
        console.log(`Fetched: ${a.title} -> ${finalUrl}`);
        
        // Find existing album creation in code
        // album("DAMN.", "Kendrick Lamar", "Pulitzer-winning modern rap classic.", p("24.99"), "https://i.scdn.co/image/...", 2017)
        // We will regex replace the URL for the specific title
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`(album\\("${escapeRegex(a.title)}",.*?, p\\("[0-9.]+"\\), )".*?"(, \\d+\\))`, 'g');
        serviceCode = serviceCode.replace(pattern, `$1"${finalUrl}"$2`);
    }

    fs.writeFileSync('backend/src/main/java/com/ecommerce/usermanagement/service/AlbumSeedService.java', serviceCode);
    console.log("AlbumSeedService.java fully updated and saved!");
}

run();
