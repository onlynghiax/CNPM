package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.model.Album;
import com.ecommerce.usermanagement.repository.AlbumRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumRepository albumRepository;

    public AlbumController(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @GetMapping
    public List<Album> list(
            @RequestParam(required = false) String artist,
            @RequestParam(required = false) String q
    ) {
        String artistParam = (artist == null || artist.isBlank()) ? null : artist.trim();
        String qParam = (q == null || q.isBlank()) ? null : q.trim();
        return albumRepository.searchByArtistAndKeyword(artistParam, qParam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Album> getById(@PathVariable Long id) {
        return albumRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Album create(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Album> update(@PathVariable Long id, @RequestBody Album albumDetails) {
        return albumRepository.findById(id).map(album -> {
            album.setTitle(albumDetails.getTitle());
            album.setArtist(albumDetails.getArtist());
            album.setDescription(albumDetails.getDescription());
            album.setPrice(albumDetails.getPrice());
            album.setImageUrl(albumDetails.getImageUrl());
            album.setGenre(albumDetails.getGenre());
            album.setReleaseYear(albumDetails.getReleaseYear());
            album.setTracklist(albumDetails.getTracklist());
            return ResponseEntity.ok(albumRepository.save(album));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return albumRepository.findById(id).map(album -> {
            albumRepository.delete(album);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
