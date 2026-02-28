package com.devtiro.tickets.repositories;

import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.EventStatusEnum;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

  Page<Event> findByOrganizerId(UUID organizerId, Pageable pageable);

  Optional<Event> findByIdAndOrganizerId(UUID id, UUID organizerId);

  boolean existsByIdAndOrganizerId(UUID id, UUID organizerId);

  @Query("SELECT e FROM Event e WHERE e.status = :status AND e.end >= CURRENT_TIMESTAMP")
  Page<Event> findByStatus(@Param("status") EventStatusEnum status, Pageable pageable);

  @Query(value = "SELECT * FROM events WHERE " +
      "status = 'PUBLISHED' AND " +
      "event_end >= CURRENT_TIMESTAMP AND " +
      "to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(venue, '') || ' ' || COALESCE(category, '')) " +
      "@@ plainto_tsquery('english', :searchTerm)", countQuery = "SELECT count(*) FROM events WHERE " +
          "status = 'PUBLISHED' AND " +
          "event_end >= CURRENT_TIMESTAMP AND " +
          "to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(venue, '') || ' ' || COALESCE(category, '')) " +
          "@@ plainto_tsquery('english', :searchTerm)", nativeQuery = true)
  Page<Event> searchEvents(@Param("searchTerm") String searchTerm, Pageable pageable);

  @Query("SELECT e FROM Event e WHERE e.id = :id AND e.status = :status AND e.end >= CURRENT_TIMESTAMP")
  Optional<Event> findByIdAndStatus(@Param("id") UUID id, @Param("status") EventStatusEnum status);
}
