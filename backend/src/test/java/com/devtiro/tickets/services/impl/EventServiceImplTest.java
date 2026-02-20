package com.devtiro.tickets.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.devtiro.tickets.domain.CreateEventRequest;
import com.devtiro.tickets.domain.UpdateEventRequest;
import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.EventStatusEnum;
import com.devtiro.tickets.domain.entities.User;
import com.devtiro.tickets.exceptions.EventUpdateException;
import com.devtiro.tickets.repositories.EventRepository;
import com.devtiro.tickets.repositories.UserRepository;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EventServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventServiceImpl eventService;

    @Test
    void createEvent_shouldSucceed_whenDatesAreValid() {
        UUID organizerId = UUID.randomUUID();
        User organizer = new User();
        organizer.setId(organizerId);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.plusDays(10);
        LocalDateTime end = now.plusDays(11);
        LocalDateTime salesStart = now.plusDays(1);
        LocalDateTime salesEnd = now.plusDays(9);

        CreateEventRequest request = new CreateEventRequest();
        request.setName("Test Event");
        request.setStart(start);
        request.setEnd(end);
        request.setSalesStart(salesStart);
        request.setSalesEnd(salesEnd);
        request.setStatus(EventStatusEnum.DRAFT);
        request.setTicketTypes(Collections.emptyList());

        when(userRepository.findById(organizerId)).thenReturn(Optional.of(organizer));
        when(eventRepository.save(any(Event.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Event createdEvent = eventService.createEvent(organizerId, request);

        assertNotNull(createdEvent);
        assertEquals(request.getName(), createdEvent.getName());
        verify(eventRepository).save(any(Event.class));
    }

    @Test
    void createEvent_shouldFail_whenEventStartInPast() {
        UUID organizerId = UUID.randomUUID();
        User organizer = new User();
        organizer.setId(organizerId);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.minusDays(1); // Past
        LocalDateTime end = now.plusDays(1);
        LocalDateTime salesStart = now.minusDays(5);
        LocalDateTime salesEnd = now.minusDays(2);

        CreateEventRequest request = new CreateEventRequest();
        request.setName("Test Event");
        request.setStart(start);
        request.setEnd(end);
        request.setSalesStart(salesStart);
        request.setSalesEnd(salesEnd);
        request.setTicketTypes(Collections.emptyList());

        when(userRepository.findById(organizerId)).thenReturn(Optional.of(organizer));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            eventService.createEvent(organizerId, request);
        });

        assertEquals("Event start date must be in the future", exception.getMessage());
    }

    @Test
    void createEvent_shouldFail_whenSalesStartInPast() {
        UUID organizerId = UUID.randomUUID();
        User organizer = new User();
        organizer.setId(organizerId);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.plusDays(10);
        LocalDateTime end = now.plusDays(11);
        LocalDateTime salesStart = now.minusDays(1); // Past
        LocalDateTime salesEnd = now.plusDays(5);

        CreateEventRequest request = new CreateEventRequest();
        request.setName("Test Event");
        request.setStart(start);
        request.setEnd(end);
        request.setSalesStart(salesStart);
        request.setSalesEnd(salesEnd);
        request.setTicketTypes(Collections.emptyList());

        when(userRepository.findById(organizerId)).thenReturn(Optional.of(organizer));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            eventService.createEvent(organizerId, request);
        });

        assertEquals("Ticket sales start date must be in the future", exception.getMessage());
    }

    @Test
    void createEvent_shouldFail_whenSalesEndAfterEventStart() {
        UUID organizerId = UUID.randomUUID();
        User organizer = new User();
        organizer.setId(organizerId);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.plusDays(10);
        LocalDateTime end = now.plusDays(11);
        LocalDateTime salesStart = now.plusDays(1);
        LocalDateTime salesEnd = now.plusDays(12); // After event start

        CreateEventRequest request = new CreateEventRequest();
        request.setName("Test Event");
        request.setStart(start);
        request.setEnd(end);
        request.setSalesStart(salesStart);
        request.setSalesEnd(salesEnd);
        request.setTicketTypes(Collections.emptyList());

        when(userRepository.findById(organizerId)).thenReturn(Optional.of(organizer));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            eventService.createEvent(organizerId, request);
        });

        assertEquals("Ticket sales end date must be before event start date", exception.getMessage());
    }

    @Test
    void createEvent_shouldFail_whenSalesStartAfterSalesEnd() {
        UUID organizerId = UUID.randomUUID();
        User organizer = new User();
        organizer.setId(organizerId);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.plusDays(10);
        LocalDateTime end = now.plusDays(11);
        LocalDateTime salesStart = now.plusDays(5);
        LocalDateTime salesEnd = now.plusDays(4); // Before sales start

        CreateEventRequest request = new CreateEventRequest();
        request.setName("Test Event");
        request.setStart(start);
        request.setEnd(end);
        request.setSalesStart(salesStart);
        request.setSalesEnd(salesEnd);
        request.setTicketTypes(Collections.emptyList());

        when(userRepository.findById(organizerId)).thenReturn(Optional.of(organizer));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            eventService.createEvent(organizerId, request);
        });

        assertEquals("Ticket sales start date must be before ticket sales end date", exception.getMessage());
    }
}
