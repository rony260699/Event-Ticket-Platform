package com.devtiro.tickets.domain.dtos;

import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
}
