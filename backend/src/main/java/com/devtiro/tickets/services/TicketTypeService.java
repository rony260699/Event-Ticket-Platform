package com.devtiro.tickets.services;

import com.devtiro.tickets.domain.dtos.PurchaseTicketRequestDto;
import com.devtiro.tickets.domain.entities.Ticket;
import java.util.UUID;

public interface TicketTypeService {
  Ticket purchaseTicket(UUID userId, UUID ticketTypeId, PurchaseTicketRequestDto purchaseRequest);
}
