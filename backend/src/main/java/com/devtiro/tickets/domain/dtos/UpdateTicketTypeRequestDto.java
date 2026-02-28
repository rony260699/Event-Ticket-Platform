package com.devtiro.tickets.domain.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UpdateTicketTypeRequestDto {

  private UUID id;

  @NotBlank(message = "Ticket type name is required")
  private String name;

  @NotNull(message = "Price is required")
  @PositiveOrZero(message = "Price must be zero or greater")
  private Double price;

  private String description;

  @PositiveOrZero(message = "Total available tickets must be zero or greater")
  private Integer totalAvailable;

  public UpdateTicketTypeRequestDto() {
  }

  public UpdateTicketTypeRequestDto(UUID id, String name, Double price, String description,
      Integer totalAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.totalAvailable = totalAvailable;
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

  public Integer getTotalAvailable() {
    return totalAvailable;
  }

  public void setTotalAvailable(Integer totalAvailable) {
    this.totalAvailable = totalAvailable;
  }
}
