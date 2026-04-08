package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.model.Album;
import com.ecommerce.usermanagement.repository.AlbumRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
