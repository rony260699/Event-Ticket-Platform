package com.devtiro.tickets.controllers;

import com.devtiro.tickets.domain.dtos.GetPublishedEventDetailsResponseDto;
import com.devtiro.tickets.domain.dtos.GetPublishedEventDetailsTicketTypesResponseDto;
import com.devtiro.tickets.domain.dtos.ListPublishedEventResponseDto;
import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.TicketType;
import com.devtiro.tickets.mappers.EventMapper;
import com.devtiro.tickets.repositories.TicketRepository;
import com.devtiro.tickets.services.EventService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/published-events")
@RequiredArgsConstructor
public class PublishedEventController {

  private final EventService eventService;
  private final EventMapper eventMapper;
  private final TicketRepository ticketRepository;

  @GetMapping
  public ResponseEntity<Page<ListPublishedEventResponseDto>> listPublishedEvents(
      @RequestParam(required = false) String q,
      @RequestParam(required = false) String category,
      Pageable pageable) {

    Page<Event> events;
    if ((null != q && !q.trim().isEmpty()) || (null != category && !category.trim().isEmpty())) {
      events = eventService.searchPublishedEvents(q, category, pageable);
    } else {
      events = eventService.listPublishedEvents(pageable);
    }

    return ResponseEntity.ok(
        events.map(eventMapper::toListPublishedEventResponseDto));
  }

  @GetMapping(path = "/{eventId}")
  public ResponseEntity<GetPublishedEventDetailsResponseDto> getPublishedEventDetails(
      @PathVariable UUID eventId) {
    return eventService.getPublishedEvent(eventId)
        .map(event -> {
          GetPublishedEventDetailsResponseDto dto = eventMapper.toGetPublishedEventDetailsResponseDto(event);
          enrichWithAvailableTickets(event, dto);
          return dto;
        })
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  private void enrichWithAvailableTickets(Event event, GetPublishedEventDetailsResponseDto dto) {
    List<TicketType> ticketTypes = event.getTicketTypes();
    List<GetPublishedEventDetailsTicketTypesResponseDto> ticketTypeDtos = dto.getTicketTypes();

    for (int i = 0; i < ticketTypes.size(); i++) {
      TicketType ticketType = ticketTypes.get(i);
      Integer totalAvailable = ticketType.getTotalAvailable();
      int purchased = ticketRepository.countByTicketTypeId(ticketType.getId());
      int available = (totalAvailable != null) ? Math.max(0, totalAvailable - purchased) : -1;
      ticketTypeDtos.get(i).setAvailableTickets(available);
    }
  }
}
