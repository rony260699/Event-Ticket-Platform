package com.devtiro.tickets.domain.dtos;

import com.devtiro.tickets.domain.entities.EventStatusEnum;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CreateEventRequestDto {

  @NotBlank(message = "Event name is required")
  private String name;

  @NotNull(message = "Event start date is required")
  @Future(message = "Event start date must be in the future")
  private LocalDateTime start;

  @NotNull(message = "Event end date is required")
  @Future(message = "Event end date must be in the future")
  private LocalDateTime end;

  @NotBlank(message = "Venue information is required")
  private String venue;

  @NotNull(message = "Sales start date is required")
  @FutureOrPresent(message = "Sales start date must be in the future or present")
  private LocalDateTime salesStart;

  @NotNull(message = "Sales end date is required")
  @Future(message = "Sales end date must be in the future")
  private LocalDateTime salesEnd;

  @NotNull(message = "Event status must be provided")
  private EventStatusEnum status;

  @NotBlank(message = "Category is required")
  private String category;

  @NotEmpty(message = "At least one ticket type is required")
  @Valid
  private List<CreateTicketTypeRequestDto> ticketTypes;

  public CreateEventRequestDto() {
  }

  public CreateEventRequestDto(String name, LocalDateTime start, LocalDateTime end, String venue,
      LocalDateTime salesStart, LocalDateTime salesEnd, EventStatusEnum status, String category,
      List<CreateTicketTypeRequestDto> ticketTypes) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.venue = venue;
    this.salesStart = salesStart;
    this.salesEnd = salesEnd;
    this.status = status;
    this.category = category;
    this.ticketTypes = ticketTypes;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDateTime getStart() {
    return start;
  }

  public void setStart(LocalDateTime start) {
    this.start = start;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }

  public String getVenue() {
    return venue;
  }

  public void setVenue(String venue) {
    this.venue = venue;
  }

  public LocalDateTime getSalesStart() {
    return salesStart;
  }

  public void setSalesStart(LocalDateTime salesStart) {
    this.salesStart = salesStart;
  }

  public LocalDateTime getSalesEnd() {
    return salesEnd;
  }

  public void setSalesEnd(LocalDateTime salesEnd) {
    this.salesEnd = salesEnd;
  }

  public EventStatusEnum getStatus() {
    return status;
  }

  public void setStatus(EventStatusEnum status) {
    this.status = status;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public List<CreateTicketTypeRequestDto> getTicketTypes() {
    return ticketTypes;
  }

  public void setTicketTypes(List<CreateTicketTypeRequestDto> ticketTypes) {
    this.ticketTypes = ticketTypes;
  }
}
