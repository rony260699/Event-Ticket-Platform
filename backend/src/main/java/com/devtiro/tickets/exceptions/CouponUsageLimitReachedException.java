package com.devtiro.tickets.exceptions;

public class CouponUsageLimitReachedException extends EventTicketException {
    public CouponUsageLimitReachedException(String message) {
        super(message);
    }
}
