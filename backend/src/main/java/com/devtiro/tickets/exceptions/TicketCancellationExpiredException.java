package com.devtiro.tickets.exceptions;

public class TicketCancellationExpiredException extends RuntimeException {
    public TicketCancellationExpiredException(String message) {
        super(message);
    }
}
