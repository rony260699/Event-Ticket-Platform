package com.devtiro.tickets.services.impl;

import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.Ticket;
import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import com.devtiro.tickets.exceptions.TicketCancellationExpiredException;
import com.devtiro.tickets.exceptions.TicketNotFoundException;
import com.devtiro.tickets.repositories.TicketRepository;
import com.devtiro.tickets.services.EmailService;
import com.devtiro.tickets.services.TicketService;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

  private final TicketRepository ticketRepository;
  private final EmailService emailService;

  @Override
  public Page<Ticket> listTicketsForUser(UUID userId, Pageable pageable) {
    return ticketRepository.findActiveTicketsByPurchaserId(userId, pageable);
  }

  @Override
  public Optional<Ticket> getTicketForUser(UUID userId, UUID ticketId) {
    return ticketRepository.findByIdAndPurchaserId(ticketId, userId);
  }

  @Override
  public void cancelTicket(UUID userId, UUID ticketId) {
    Ticket ticket = ticketRepository.findByIdAndPurchaserId(ticketId, userId)
        .orElseThrow(() -> new TicketNotFoundException("Ticket not found or doesn't belong to user"));

    Event event = ticket.getTicketType().getEvent();
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime eventStart = event.getStart();

    if (eventStart != null && ChronoUnit.DAYS.between(now, eventStart) < 3) {
      throw new TicketCancellationExpiredException(
          "Tickets can only be cancelled at least 3 days before the event starts");
    }

    ticket.setStatus(TicketStatusEnum.REFUND_PENDING);
    Ticket savedTicket = ticketRepository.save(ticket);
    emailService.sendTicketCancellation(savedTicket);
  }
}
