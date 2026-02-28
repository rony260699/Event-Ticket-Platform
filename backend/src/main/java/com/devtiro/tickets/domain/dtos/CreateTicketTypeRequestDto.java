package com.devtiro.tickets.domain.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CreateTicketTypeRequestDto {

  @NotBlank(message = "Ticket type name is required")
  private String name;

  @NotNull(message = "Price is required")
  @PositiveOrZero(message = "Price must be zero or greater")
  private Double price;

  private String description;

  private Integer totalAvailable;

  public CreateTicketTypeRequestDto() {
  }

  public CreateTicketTypeRequestDto(String name, Double price, String description,
      Integer totalAvailable) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.totalAvailable = totalAvailable;
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
