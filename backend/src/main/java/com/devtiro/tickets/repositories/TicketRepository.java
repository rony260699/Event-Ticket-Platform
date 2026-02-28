package com.devtiro.tickets.repositories;

import com.devtiro.tickets.domain.entities.Ticket;
import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import com.devtiro.tickets.domain.entities.TicketValidationStatusEnum;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

  int countByTicketTypeId(UUID ticketTypeId);

  long countByTicketTypeEventId(UUID eventId);

  @Query("SELECT SUM(t.pricePaid) FROM Ticket t WHERE t.ticketType.event.id = :eventId")
  Double sumPricePaidByEventId(UUID eventId);

  long countByTicketTypeEventIdAndStatus(UUID eventId, com.devtiro.tickets.domain.entities.TicketStatusEnum status);

  Page<Ticket> findByPurchaserId(UUID purchaserId, Pageable pageable);

  Optional<Ticket> findByIdAndPurchaserId(UUID id, UUID purchaserId);

  Page<Ticket> findByTicketTypeEventId(UUID eventId, Pageable pageable);

  @Query("SELECT COUNT(DISTINCT t) FROM Ticket t JOIN t.validations v WHERE t.ticketType.event.id = :eventId AND v.status = :status")
  long countCheckedInByEventId(UUID eventId, TicketValidationStatusEnum status);

  @Query("SELECT t FROM Ticket t " +
      "LEFT JOIN t.validations v ON v.status = 'VALID' " +
      "WHERE t.purchaser.id = :purchaserId " +
      "AND t.status = :status " +
      "AND (t.ticketType.event.end IS NULL OR t.ticketType.event.end > CURRENT_TIMESTAMP) " +
      "GROUP BY t.id " +
      "HAVING COUNT(v.id) = 0")
  Page<Ticket> findActiveTicketsByPurchaserId(UUID purchaserId, TicketStatusEnum status, Pageable pageable);
}
