package com.devtiro.tickets.services.impl;

import com.devtiro.tickets.domain.dtos.PurchaseTicketRequestDto;
import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.Ticket;
import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import com.devtiro.tickets.domain.entities.TicketType;
import com.devtiro.tickets.domain.entities.User;
import com.devtiro.tickets.exceptions.TicketTypeNotFoundException;
import com.devtiro.tickets.exceptions.TicketsSoldOutException;
import com.devtiro.tickets.exceptions.UserNotFoundException;
import com.devtiro.tickets.repositories.TicketRepository;
import com.devtiro.tickets.repositories.TicketTypeRepository;
import com.devtiro.tickets.repositories.UserRepository;
import com.devtiro.tickets.services.EmailService;
import com.devtiro.tickets.services.QrCodeService;
import com.devtiro.tickets.services.TicketTypeService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketTypeServiceImpl implements TicketTypeService {

  private final UserRepository userRepository;
  private final TicketTypeRepository ticketTypeRepository;
  private final TicketRepository ticketRepository;
  private final QrCodeService qrCodeService;
  private final EmailService emailService;

  @Override
  @Transactional
  public Ticket purchaseTicket(UUID userId, UUID ticketTypeId, PurchaseTicketRequestDto purchaseRequest) {
    User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(
        String.format("User with ID %s was not found", userId)));

    TicketType ticketType = ticketTypeRepository.findByIdWithLock(ticketTypeId)
        .orElseThrow(() -> new TicketTypeNotFoundException(
            String.format("Ticket type with ID %s was not found", ticketTypeId)));

    int purchasedTickets = ticketRepository.countByTicketTypeIdAndStatus(ticketType.getId(),
        TicketStatusEnum.PURCHASED);
    Integer totalAvailable = ticketType.getTotalAvailable();

    if (purchasedTickets + 1 > totalAvailable) {
      throw new TicketsSoldOutException();
    }

    Event event = ticketType.getEvent();
    LocalDateTime now = LocalDateTime.now();

    if (event.getSalesStart() != null) {
      if (now.isBefore(event.getSalesStart())) {
        throw new IllegalArgumentException("Ticket sales have not started yet");
      }
    } else {
      // If salesStart is null, we should probably assume it hasn't started if it's a
      // required field,
      // but for now let's just log it. If the user wants strict adherence, we should
      // ensure it's not null.
      log.warn("Event {} has no salesStart date", event.getId());
    }

    if (event.getSalesEnd() != null) {
      if (now.isAfter(event.getSalesEnd())) {
        throw new IllegalArgumentException("Ticket sales have ended");
      }
    } else {
      log.warn("Event {} has no salesEnd date", event.getId());
    }

    log.info("Processing payment for user {} using method: {} and transaction: {}",
        user.getEmail(), purchaseRequest.getPaymentMethod(), purchaseRequest.getTransactionId());

    double priceToPay = ticketType.getPrice();

    Ticket ticket = new Ticket();
    ticket.setStatus(TicketStatusEnum.PURCHASED);
    ticket.setTicketType(ticketType);
    ticket.setPurchaser(user);
    ticket.setPricePaid(priceToPay);

    Ticket savedTicket = ticketRepository.save(ticket);
    qrCodeService.generateQrCode(savedTicket);

    savedTicket = ticketRepository.save(savedTicket);

    // Send email notification
    emailService.sendTicketConfirmation(savedTicket);

    return savedTicket;
  }
}
