function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(Data => {
            const lyrics = Data.lyrics;
            const lyricsShow = document.getElementById('lyricsGet');
            lyricsShow.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
                                        <pre class="lyric text-white">${lyrics}</pre>`
        })
        document.getElementById('lyrics-search').innerHTML = '';
}



function lyricsSearch() {
    const songName = document.getElementById('song-name-input').value;
    document.getElementById('lyrics-search').innerHTML = '';
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(json => {
        const songs = json.data;
        for (let i = 0; i < 10; i++) {
            const song = songs[i];
            const title = song.title;
            const artist = song.artist.name;
            const type = song.type;

            const result = document.getElementById('lyrics-search');
            result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                    <div class="col-md-9">
                                        <h3 class="lyrics-name">${title}</h3>
                                        <p class="author lead">${type} by <span>${artist}</span></p>
                                    </div>
                                    <div class="col-md-3 text-md-right text-center">
                                        <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                                    </div>
                                </div>`
        }
    })
}