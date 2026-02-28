package com.devtiro.tickets.domain.dtos;

public class ErrorDto {

  private String error;

  public ErrorDto() {
  }

  public ErrorDto(String error) {
    this.error = error;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }
}
