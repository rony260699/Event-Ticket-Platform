package com.devtiro.tickets.domain.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name = "users")
public class User {

  @Id
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "email", nullable = false)
  private String email;

  @OneToMany(mappedBy = "organizer", cascade = CascadeType.ALL)
  private List<Event> organizedEvents = new ArrayList<>();

  @ManyToMany
  @JoinTable(name = "user_attending_events", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
  private List<Event> attendingEvents = new ArrayList<>();

  @ManyToMany
  @JoinTable(name = "user_staffing_events", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
  private List<Event> staffingEvents = new ArrayList<>();

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  public User() {
  }

  public User(UUID id, String name, String email, List<Event> organizedEvents, List<Event> attendingEvents,
      List<Event> staffingEvents, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.organizedEvents = organizedEvents;
    this.attendingEvents = attendingEvents;
    this.staffingEvents = staffingEvents;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public List<Event> getOrganizedEvents() {
    return organizedEvents;
  }

  public void setOrganizedEvents(List<Event> organizedEvents) {
    this.organizedEvents = organizedEvents;
  }

  public List<Event> getAttendingEvents() {
    return attendingEvents;
  }

  public void setAttendingEvents(List<Event> attendingEvents) {
    this.attendingEvents = attendingEvents;
  }

  public List<Event> getStaffingEvents() {
    return staffingEvents;
  }

  public void setStaffingEvents(List<Event> staffingEvents) {
    this.staffingEvents = staffingEvents;
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
    User user = (User) o;
    return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(email, user.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, email);
  }
}
