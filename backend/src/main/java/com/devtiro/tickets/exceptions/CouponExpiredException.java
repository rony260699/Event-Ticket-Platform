package com.devtiro.tickets.exceptions;

public class CouponExpiredException extends EventTicketException {
    public CouponExpiredException(String message) {
        super(message);
    }
}
