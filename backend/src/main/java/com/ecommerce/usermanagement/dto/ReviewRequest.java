package com.ecommerce.usermanagement.dto;

public class ReviewRequest {
    private Long albumId;
    private Integer rating;
    private String comment;

    public Long getAlbumId() { return albumId; }
    public void setAlbumId(Long albumId) { this.albumId = albumId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
