package com.devtiro.tickets.services;

import com.devtiro.tickets.domain.entities.Ticket;

public interface EmailService {
    void sendTicketConfirmation(Ticket ticket);

    void sendTicketCancellation(Ticket ticket);
}
