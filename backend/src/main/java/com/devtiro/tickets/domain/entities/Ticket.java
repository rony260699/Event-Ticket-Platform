package com.devtiro.tickets.domain.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "tickets")
public class Ticket {

  @Id
  @Column(name = "id", nullable = false, updatable = false)
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "status", nullable = false)
  @Enumerated(EnumType.STRING)
  private TicketStatusEnum status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "ticket_type_id")
  private TicketType ticketType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "purchaser_id")
  private User purchaser;

  @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
  private List<TicketValidation> validations = new ArrayList<>();

  @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
  private List<QrCode> qrCodes = new ArrayList<>();

  @Column(name = "price_paid", nullable = false)
  private Double pricePaid;

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  public Ticket() {
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public TicketStatusEnum getStatus() {
    return status;
  }

  public void setStatus(TicketStatusEnum status) {
    this.status = status;
  }

  public TicketType getTicketType() {
    return ticketType;
  }

  public void setTicketType(TicketType ticketType) {
    this.ticketType = ticketType;
  }

  public User getPurchaser() {
    return purchaser;
  }

  public void setPurchaser(User purchaser) {
    this.purchaser = purchaser;
  }

  public List<TicketValidation> getValidations() {
    return validations;
  }

  public void setValidations(List<TicketValidation> validations) {
    this.validations = validations;
  }

  public List<QrCode> getQrCodes() {
    return qrCodes;
  }

  public void setQrCodes(List<QrCode> qrCodes) {
    this.qrCodes = qrCodes;
  }

  public Double getPricePaid() {
    return pricePaid;
  }

  public void setPricePaid(Double pricePaid) {
    this.pricePaid = pricePaid;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    Ticket ticket = (Ticket) o;
    return Objects.equals(id, ticket.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public static TicketBuilder builder() {
    return new TicketBuilder();
  }

  public static class TicketBuilder {
    private UUID id;
    private TicketStatusEnum status;
    private TicketType ticketType;
    private User purchaser;
    private Double pricePaid;

    public TicketBuilder id(UUID id) {
      this.id = id;
      return this;
    }

    public TicketBuilder status(TicketStatusEnum status) {
      this.status = status;
      return this;
    }

    public TicketBuilder ticketType(TicketType ticketType) {
      this.ticketType = ticketType;
      return this;
    }

    public TicketBuilder purchaser(User purchaser) {
      this.purchaser = purchaser;
      return this;
    }

    public TicketBuilder pricePaid(Double pricePaid) {
      this.pricePaid = pricePaid;
      return this;
    }

    public Ticket build() {
      Ticket ticket = new Ticket();
      ticket.setId(id);
      ticket.setStatus(status);
      ticket.setTicketType(ticketType);
      ticket.setPurchaser(purchaser);
      ticket.setPricePaid(pricePaid);
      return ticket;
    }
  }
}
