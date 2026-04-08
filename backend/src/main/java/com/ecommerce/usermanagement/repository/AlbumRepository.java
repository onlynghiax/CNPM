package com.ecommerce.usermanagement.repository;

import com.ecommerce.usermanagement.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("""
            SELECT a FROM Album a
            WHERE (:artist IS NULL OR LOWER(a.artist) = LOWER(:artist))
            AND (:q IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :q, '%'))
                 OR LOWER(a.artist) LIKE LOWER(CONCAT('%', :q, '%')))
            ORDER BY a.artist, a.title
            """)
    List<Album> searchByArtistAndKeyword(
            @Param("artist") String artist,
            @Param("q") String q
    );
}
