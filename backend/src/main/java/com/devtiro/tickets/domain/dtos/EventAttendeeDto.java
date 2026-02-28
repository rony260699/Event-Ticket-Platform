package com.devtiro.tickets.domain.dtos;

import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import java.time.LocalDateTime;
import java.util.UUID;

public class EventAttendeeDto {
    private UUID ticketId;
    private String purchaserName;
    private String purchaserEmail;
    private String ticketTypeName;
    private Double pricePaid;
    private LocalDateTime purchasedAt;
    private TicketStatusEnum status;
    private boolean checkedIn;
    private LocalDateTime checkedInAt;

    public EventAttendeeDto() {
    }

    public EventAttendeeDto(UUID ticketId, String purchaserName, String purchaserEmail, String ticketTypeName,
            Double pricePaid, LocalDateTime purchasedAt, TicketStatusEnum status, boolean checkedIn,
            LocalDateTime checkedInAt) {
        this.ticketId = ticketId;
        this.purchaserName = purchaserName;
        this.purchaserEmail = purchaserEmail;
        this.ticketTypeName = ticketTypeName;
        this.pricePaid = pricePaid;
        this.purchasedAt = purchasedAt;
        this.status = status;
        this.checkedIn = checkedIn;
        this.checkedInAt = checkedInAt;
    }

    public UUID getTicketId() {
        return ticketId;
    }

    public void setTicketId(UUID ticketId) {
        this.ticketId = ticketId;
    }

    public String getPurchaserName() {
        return purchaserName;
    }

    public void setPurchaserName(String purchaserName) {
        this.purchaserName = purchaserName;
    }

    public String getPurchaserEmail() {
        return purchaserEmail;
    }

    public void setPurchaserEmail(String purchaserEmail) {
        this.purchaserEmail = purchaserEmail;
    }

    public String getTicketTypeName() {
        return ticketTypeName;
    }

    public void setTicketTypeName(String ticketTypeName) {
        this.ticketTypeName = ticketTypeName;
    }

    public Double getPricePaid() {
        return pricePaid;
    }

    public void setPricePaid(Double pricePaid) {
        this.pricePaid = pricePaid;
    }

    public LocalDateTime getPurchasedAt() {
        return purchasedAt;
    }

    public void setPurchasedAt(LocalDateTime purchasedAt) {
        this.purchasedAt = purchasedAt;
    }

    public TicketStatusEnum getStatus() {
        return status;
    }

    public void setStatus(TicketStatusEnum status) {
        this.status = status;
    }

    public boolean isCheckedIn() {
        return checkedIn;
    }

    public void setCheckedIn(boolean checkedIn) {
        this.checkedIn = checkedIn;
    }

    public LocalDateTime getCheckedInAt() {
        return checkedInAt;
    }

    public void setCheckedInAt(LocalDateTime checkedInAt) {
        this.checkedInAt = checkedInAt;
    }

    public static EventAttendeeDtoBuilder builder() {
        return new EventAttendeeDtoBuilder();
    }

    public static class EventAttendeeDtoBuilder {
        private UUID ticketId;
        private String purchaserName;
        private String purchaserEmail;
        private String ticketTypeName;
        private Double pricePaid;
        private LocalDateTime purchasedAt;
        private TicketStatusEnum status;
        private boolean checkedIn;
        private LocalDateTime checkedInAt;

        public EventAttendeeDtoBuilder ticketId(UUID ticketId) {
            this.ticketId = ticketId;
            return this;
        }

        public EventAttendeeDtoBuilder purchaserName(String purchaserName) {
            this.purchaserName = purchaserName;
            return this;
        }

        public EventAttendeeDtoBuilder purchaserEmail(String purchaserEmail) {
            this.purchaserEmail = purchaserEmail;
            return this;
        }

        public EventAttendeeDtoBuilder ticketTypeName(String ticketTypeName) {
            this.ticketTypeName = ticketTypeName;
            return this;
        }

        public EventAttendeeDtoBuilder pricePaid(Double pricePaid) {
            this.pricePaid = pricePaid;
            return this;
        }

        public EventAttendeeDtoBuilder purchasedAt(LocalDateTime purchasedAt) {
            this.purchasedAt = purchasedAt;
            return this;
        }

        public EventAttendeeDtoBuilder status(TicketStatusEnum status) {
            this.status = status;
            return this;
        }

        public EventAttendeeDtoBuilder checkedIn(boolean checkedIn) {
            this.checkedIn = checkedIn;
            return this;
        }

        public EventAttendeeDtoBuilder checkedInAt(LocalDateTime checkedInAt) {
            this.checkedInAt = checkedInAt;
            return this;
        }

        public EventAttendeeDto build() {
            return new EventAttendeeDto(ticketId, purchaserName, purchaserEmail, ticketTypeName, pricePaid, purchasedAt,
                    status, checkedIn, checkedInAt);
        }
    }
}
