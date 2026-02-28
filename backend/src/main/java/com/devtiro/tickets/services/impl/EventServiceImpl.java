package com.devtiro.tickets.services.impl;

import lombok.extern.slf4j.Slf4j;
import com.devtiro.tickets.domain.CreateEventRequest;
import com.devtiro.tickets.domain.UpdateEventRequest;
import com.devtiro.tickets.domain.UpdateTicketTypeRequest;
import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.EventStatusEnum;
import com.devtiro.tickets.domain.entities.TicketType;
import com.devtiro.tickets.domain.entities.User;
import com.devtiro.tickets.exceptions.EventNotFoundException;
import com.devtiro.tickets.exceptions.EventUpdateException;
import com.devtiro.tickets.exceptions.TicketTypeNotFoundException;
import com.devtiro.tickets.exceptions.UserNotFoundException;
import com.devtiro.tickets.repositories.EventRepository;
import com.devtiro.tickets.repositories.TicketRepository;
import com.devtiro.tickets.repositories.UserRepository;
import com.devtiro.tickets.services.EventService;
import com.devtiro.tickets.domain.dtos.EventStatsResponseDto;
import com.devtiro.tickets.domain.dtos.EventAttendeeDto;
import com.devtiro.tickets.domain.entities.TicketValidationStatusEnum;
import com.devtiro.tickets.domain.entities.TicketValidation;
import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

  private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(EventServiceImpl.class);

  private final UserRepository userRepository;
  private final EventRepository eventRepository;
  private final TicketRepository ticketRepository;

  @Override
  @Transactional
  public Event createEvent(UUID organizerId, CreateEventRequest event) {
    User organizer = userRepository.findById(organizerId)
        .orElseThrow(() -> new UserNotFoundException(
            String.format("User with ID '%s' not found", organizerId)));

    Event eventToCreate = new Event();

    List<TicketType> ticketTypesToCreate = event.getTicketTypes().stream().map(
        ticketType -> {
          TicketType ticketTypeToCreate = new TicketType();
          ticketTypeToCreate.setName(ticketType.getName());
          ticketTypeToCreate.setPrice(ticketType.getPrice());
          ticketTypeToCreate.setDescription(ticketType.getDescription());
          ticketTypeToCreate.setTotalAvailable(ticketType.getTotalAvailable());
          ticketTypeToCreate.setEvent(eventToCreate);
          return ticketTypeToCreate;
        }).toList();

    eventToCreate.setName(event.getName());
    eventToCreate.setStart(event.getStart());
    eventToCreate.setEnd(event.getEnd());
    eventToCreate.setVenue(event.getVenue());
    eventToCreate.setSalesStart(event.getSalesStart());
    eventToCreate.setSalesEnd(event.getSalesEnd());
    eventToCreate.setStatus(event.getStatus());
    eventToCreate.setCategory(event.getCategory());
    eventToCreate.setOrganizer(organizer);
    eventToCreate.setTicketTypes(ticketTypesToCreate);

    validateDates(eventToCreate.getStart(), eventToCreate.getSalesStart(), eventToCreate.getSalesEnd());

    return eventRepository.save(eventToCreate);
  }

  private void validateDates(LocalDateTime start, LocalDateTime salesStart, LocalDateTime salesEnd) {
    if (start == null || salesStart == null || salesEnd == null) {
      throw new IllegalArgumentException("Event start, sales start, and sales end dates are required");
    }

    LocalDateTime now = LocalDateTime.now();

    if (start.isBefore(now)) {
      throw new IllegalArgumentException("Event start date must be in the future");
    }

    if (salesStart.isBefore(now)) {
      throw new IllegalArgumentException("Ticket sales start date must be in the future");
    }

    if (salesEnd.isAfter(start)) {
      throw new IllegalArgumentException("Ticket sales end date must be before event start date");
    }

    if (salesStart.isAfter(salesEnd)) {
      throw new IllegalArgumentException("Ticket sales start date must be before ticket sales end date");
    }
  }

  @Override
  public Page<Event> listEventsForOrganizer(UUID organizerId, Pageable pageable) {
    return eventRepository.findByOrganizerId(organizerId, pageable);
  }

  @Override
  public Optional<Event> getEventForOrganizer(UUID organizerId, UUID id) {
    return eventRepository.findByIdAndOrganizerId(id, organizerId);
  }

  @Override
  @Transactional
  public Event updateEventForOrganizer(UUID organizerId, UUID id, UpdateEventRequest event) {
    if (null == event.getId()) {
      throw new EventUpdateException("Event ID cannot be null");
    }

    if (!id.equals(event.getId())) {
      throw new EventUpdateException("Cannot update the ID of an event");
    }

    Event existingEvent = eventRepository
        .findByIdAndOrganizerId(id, organizerId)
        .orElseThrow(() -> new EventNotFoundException(
            String.format("Event with ID '%s' does not exist", id)));

    existingEvent.setName(event.getName());
    existingEvent.setStart(event.getStart());
    existingEvent.setEnd(event.getEnd());
    existingEvent.setVenue(event.getVenue());
    existingEvent.setSalesStart(event.getSalesStart());
    existingEvent.setSalesEnd(event.getSalesEnd());
    existingEvent.setStatus(event.getStatus());
    existingEvent.setCategory(event.getCategory());

    validateDates(existingEvent.getStart(), existingEvent.getSalesStart(), existingEvent.getSalesEnd());

    Set<UUID> requestTicketTypeIds = event.getTicketTypes()
        .stream()
        .map(UpdateTicketTypeRequest::getId)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    existingEvent.getTicketTypes()
        .removeIf(existingTicketType -> !requestTicketTypeIds.contains(existingTicketType.getId()));

    Map<UUID, TicketType> existingTicketTypesIndex = existingEvent.getTicketTypes().stream()
        .collect(Collectors.toMap(TicketType::getId, Function.identity()));

    for (UpdateTicketTypeRequest ticketType : event.getTicketTypes()) {
      if (null == ticketType.getId()) {
        // Create
        TicketType ticketTypeToCreate = new TicketType();
        ticketTypeToCreate.setName(ticketType.getName());
        ticketTypeToCreate.setPrice(ticketType.getPrice());
        ticketTypeToCreate.setDescription(ticketType.getDescription());
        ticketTypeToCreate.setTotalAvailable(ticketType.getTotalAvailable());
        ticketTypeToCreate.setEvent(existingEvent);
        existingEvent.getTicketTypes().add(ticketTypeToCreate);

      } else if (existingTicketTypesIndex.containsKey(ticketType.getId())) {
        // Update
        TicketType existingTicketType = existingTicketTypesIndex.get(ticketType.getId());
        existingTicketType.setName(ticketType.getName());
        existingTicketType.setPrice(ticketType.getPrice());
        existingTicketType.setDescription(ticketType.getDescription());
        existingTicketType.setTotalAvailable(ticketType.getTotalAvailable());
      } else {
        throw new TicketTypeNotFoundException(String.format(
            "Ticket type with ID '%s' does not exist", ticketType.getId()));
      }
    }

    return eventRepository.save(existingEvent);
  }

  @Override
  @Transactional
  public void deleteEventForOrganizer(UUID organizerId, UUID id) {
    getEventForOrganizer(organizerId, id).ifPresent(eventRepository::delete);
  }

  @Override
  public Page<Event> listPublishedEvents(Pageable pageable) {
    return eventRepository.findByStatus(EventStatusEnum.PUBLISHED, pageable);
  }

  @Override
  public Page<Event> searchPublishedEvents(String query, String category, Pageable pageable) {
    if (category != null && !category.isEmpty()) {
      String fullQuery = query + " " + category;
      return eventRepository.searchEvents(fullQuery.trim(), pageable);
    }
    return eventRepository.searchEvents(query, pageable);
  }

  @Override
  public Optional<Event> getPublishedEvent(UUID id) {
    return eventRepository.findByIdAndStatus(id, EventStatusEnum.PUBLISHED);
  }

  @Override
  public EventStatsResponseDto getEventStats(UUID organizerId, UUID id) {
    log.info("Fetching stats for event ID: {} for organizer: {}", id, organizerId);
    if (!eventRepository.existsByIdAndOrganizerId(id, organizerId)) {
      log.warn("Event {} not found for organizer {}", id, organizerId);
      throw new EventNotFoundException(String.format("Event with ID '%s' not found for organizer", id));
    }

    long totalTicketsSold = ticketRepository.countByTicketTypeEventId(id);
    Double totalRevenue = ticketRepository.sumPricePaidByEventId(id);
    long totalCheckedIn = ticketRepository.countCheckedInByEventId(id, TicketValidationStatusEnum.VALID);

    log.info("Stats fetched: sold={}, revenue={}, checkedIn={}", totalTicketsSold, totalRevenue, totalCheckedIn);

    double checkInPercentage = totalTicketsSold > 0 ? (double) totalCheckedIn / totalTicketsSold * 100 : 0;

    return EventStatsResponseDto.builder()
        .totalTicketsSold(totalTicketsSold)
        .totalRevenue(totalRevenue != null ? totalRevenue : 0.0)
        .checkInPercentage(checkInPercentage)
        .totalCheckedIn(totalCheckedIn)
        .build();
  }

  @Override
  public Page<EventAttendeeDto> getEventAttendees(UUID organizerId, UUID eventId, Pageable pageable) {
    if (!eventRepository.existsByIdAndOrganizerId(eventId, organizerId)) {
      throw new EventNotFoundException(String.format("Event with ID '%s' not found for organizer", eventId));
    }

    return ticketRepository.findByTicketTypeEventId(eventId, pageable).map(ticket -> {
      TicketValidation firstValid = ticket.getValidations().stream()
          .filter(v -> TicketValidationStatusEnum.VALID.equals(v.getStatus()))
          .findFirst()
          .orElse(null);

      return EventAttendeeDto.builder()
          .ticketId(ticket.getId())
          .purchaserName(ticket.getPurchaser().getName())
          .purchaserEmail(ticket.getPurchaser().getEmail())
          .ticketTypeName(ticket.getTicketType().getName())
          .pricePaid(ticket.getPricePaid())
          .purchasedAt(ticket.getCreatedAt())
          .status(ticket.getStatus())
          .checkedIn(firstValid != null)
          .checkedInAt(firstValid != null ? firstValid.getCreatedAt() : null)
          .build();
    });
  }
}
