package com.devtiro.tickets.domain;

import com.devtiro.tickets.domain.entities.EventStatusEnum;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CreateEventRequest {

  private String name;
  private LocalDateTime start;
  private LocalDateTime end;
  private String venue;
  private LocalDateTime salesStart;
  private LocalDateTime salesEnd;
  private EventStatusEnum status;
  private String category;
  private List<CreateTicketTypeRequest> ticketTypes = new ArrayList<>();

  public CreateEventRequest() {
  }

  public CreateEventRequest(String name, LocalDateTime start, LocalDateTime end, String venue,
      LocalDateTime salesStart, LocalDateTime salesEnd, EventStatusEnum status, String category,
      List<CreateTicketTypeRequest> ticketTypes) {
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

  public List<CreateTicketTypeRequest> getTicketTypes() {
    return ticketTypes;
  }

  public void setTicketTypes(List<CreateTicketTypeRequest> ticketTypes) {
    this.ticketTypes = ticketTypes;
  }
}
