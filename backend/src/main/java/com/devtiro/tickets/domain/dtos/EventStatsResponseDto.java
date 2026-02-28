package com.devtiro.tickets.domain.dtos;

public class EventStatsResponseDto {
    private long totalTicketsSold;
    private double totalRevenue;
    private double checkInPercentage;
    private long totalCheckedIn;

    public EventStatsResponseDto() {
    }

    public EventStatsResponseDto(long totalTicketsSold, double totalRevenue, double checkInPercentage,
            long totalCheckedIn) {
        this.totalTicketsSold = totalTicketsSold;
        this.totalRevenue = totalRevenue;
        this.checkInPercentage = checkInPercentage;
        this.totalCheckedIn = totalCheckedIn;
    }

    public long getTotalTicketsSold() {
        return totalTicketsSold;
    }

    public void setTotalTicketsSold(long totalTicketsSold) {
        this.totalTicketsSold = totalTicketsSold;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getCheckInPercentage() {
        return checkInPercentage;
    }

    public void setCheckInPercentage(double checkInPercentage) {
        this.checkInPercentage = checkInPercentage;
    }

    public long getTotalCheckedIn() {
        return totalCheckedIn;
    }

    public void setTotalCheckedIn(long totalCheckedIn) {
        this.totalCheckedIn = totalCheckedIn;
    }

    public static EventStatsResponseDtoBuilder builder() {
        return new EventStatsResponseDtoBuilder();
    }

    public static class EventStatsResponseDtoBuilder {
        private long totalTicketsSold;
        private double totalRevenue;
        private double checkInPercentage;
        private long totalCheckedIn;

        public EventStatsResponseDtoBuilder totalTicketsSold(long totalTicketsSold) {
            this.totalTicketsSold = totalTicketsSold;
            return this;
        }

        public EventStatsResponseDtoBuilder totalRevenue(double totalRevenue) {
            this.totalRevenue = totalRevenue;
            return this;
        }

        public EventStatsResponseDtoBuilder checkInPercentage(double checkInPercentage) {
            this.checkInPercentage = checkInPercentage;
            return this;
        }

        public EventStatsResponseDtoBuilder totalCheckedIn(long totalCheckedIn) {
            this.totalCheckedIn = totalCheckedIn;
            return this;
        }

        public EventStatsResponseDto build() {
            return new EventStatsResponseDto(totalTicketsSold, totalRevenue, checkInPercentage, totalCheckedIn);
        }
    }
}
