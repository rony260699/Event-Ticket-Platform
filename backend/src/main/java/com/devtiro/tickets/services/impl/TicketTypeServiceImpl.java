package com.devtiro.tickets.services.impl;

import com.devtiro.tickets.domain.dtos.PurchaseTicketRequestDto;
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

    int purchasedTickets = ticketRepository.countByTicketTypeId(ticketType.getId());
    Integer totalAvailable = ticketType.getTotalAvailable();

    if (purchasedTickets + 1 > totalAvailable) {
      throw new TicketsSoldOutException();
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
