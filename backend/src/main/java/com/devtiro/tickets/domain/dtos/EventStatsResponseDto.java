package com.devtiro.tickets.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventStatsResponseDto {
    private long totalTicketsSold;
    private double totalRevenue;
    private double checkInPercentage;
    private long totalCheckedIn;
}
