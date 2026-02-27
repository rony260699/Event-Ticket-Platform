package com.devtiro.tickets.exceptions;

public class CouponNotFoundException extends EventTicketException {
    public CouponNotFoundException(String message) {
        super(message);
    }
}
