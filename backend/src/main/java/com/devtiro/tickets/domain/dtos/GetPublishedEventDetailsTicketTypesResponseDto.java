package com.devtiro.tickets.domain.dtos;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class GetPublishedEventDetailsTicketTypesResponseDto {

  private UUID id;
  private String name;
  private Double price;
  private String description;
  private Integer availableTickets;

  public GetPublishedEventDetailsTicketTypesResponseDto() {
  }

  public GetPublishedEventDetailsTicketTypesResponseDto(UUID id, String name, Double price,
      String description, Integer availableTickets) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.availableTickets = availableTickets;
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

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getAvailableTickets() {
    return availableTickets;
  }

  public void setAvailableTickets(Integer availableTickets) {
    this.availableTickets = availableTickets;
  }
}
