package com.devtiro.tickets.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CreateTicketTypeRequest {

  private String name;
  private Double price;
  private String description;
  private Integer totalAvailable;

  public CreateTicketTypeRequest() {
  }

  public CreateTicketTypeRequest(String name, Double price, String description,
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
