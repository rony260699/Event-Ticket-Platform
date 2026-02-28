package com.devtiro.tickets.domain.dtos;

public class PurchaseTicketRequestDto {

    private String paymentMethod;
    private String transactionId;

    public PurchaseTicketRequestDto() {
    }

    public PurchaseTicketRequestDto(String paymentMethod, String transactionId) {
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public static PurchaseTicketRequestDtoBuilder builder() {
        return new PurchaseTicketRequestDtoBuilder();
    }

    public static class PurchaseTicketRequestDtoBuilder {
        private String paymentMethod;
        private String transactionId;

        public PurchaseTicketRequestDtoBuilder paymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
            return this;
        }

        public PurchaseTicketRequestDtoBuilder transactionId(String transactionId) {
            this.transactionId = transactionId;
            return this;
        }

        public PurchaseTicketRequestDto build() {
            return new PurchaseTicketRequestDto(paymentMethod, transactionId);
        }
    }
}
