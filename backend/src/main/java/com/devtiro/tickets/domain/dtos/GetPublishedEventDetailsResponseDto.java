package com.devtiro.tickets.domain.dtos;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class GetPublishedEventDetailsResponseDto {

  private UUID id;
  private String name;
  private LocalDateTime start;
  private LocalDateTime end;
  private String venue;
  private LocalDateTime salesStart;
  private LocalDateTime salesEnd;
  private List<GetPublishedEventDetailsTicketTypesResponseDto> ticketTypes = new ArrayList<>();

  public GetPublishedEventDetailsResponseDto() {
  }

  public GetPublishedEventDetailsResponseDto(UUID id, String name, LocalDateTime start,
      LocalDateTime end, String venue, LocalDateTime salesStart, LocalDateTime salesEnd,
      List<GetPublishedEventDetailsTicketTypesResponseDto> ticketTypes) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.venue = venue;
    this.salesStart = salesStart;
    this.salesEnd = salesEnd;
    this.ticketTypes = ticketTypes;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
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

  public List<GetPublishedEventDetailsTicketTypesResponseDto> getTicketTypes() {
    return ticketTypes;
  }

  public void setTicketTypes(List<GetPublishedEventDetailsTicketTypesResponseDto> ticketTypes) {
    this.ticketTypes = ticketTypes;
  }
}
