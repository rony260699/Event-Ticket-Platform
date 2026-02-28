package com.devtiro.tickets.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.devtiro.tickets.domain.dtos.PurchaseTicketRequestDto;
import com.devtiro.tickets.domain.entities.Event;
import com.devtiro.tickets.domain.entities.Ticket;
import com.devtiro.tickets.domain.entities.TicketStatusEnum;
import com.devtiro.tickets.domain.entities.TicketType;
import com.devtiro.tickets.domain.entities.User;
import com.devtiro.tickets.exceptions.TicketsSoldOutException;
import com.devtiro.tickets.repositories.TicketRepository;
import com.devtiro.tickets.repositories.TicketTypeRepository;
import com.devtiro.tickets.repositories.UserRepository;
import com.devtiro.tickets.services.EmailService;
import com.devtiro.tickets.services.QrCodeService;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TicketTypeServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private TicketTypeRepository ticketTypeRepository;

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private QrCodeService qrCodeService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private TicketTypeServiceImpl ticketTypeService;

    @Test
    void purchaseTicket_shouldSucceed_whenTicketsAreAvailable() {
        UUID userId = UUID.randomUUID();
        UUID ticketTypeId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);
        user.setEmail("test@example.com");

        Event event = new Event();
        event.setId(UUID.randomUUID());

        TicketType ticketType = new TicketType();
        ticketType.setId(ticketTypeId);
        ticketType.setTotalAvailable(10);
        ticketType.setPrice(100.0);
        ticketType.setEvent(event);

        PurchaseTicketRequestDto request = new PurchaseTicketRequestDto();
        request.setPaymentMethod("CREDIT_CARD");
        request.setTransactionId("trans_123");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(ticketTypeRepository.findByIdWithLock(ticketTypeId)).thenReturn(Optional.of(ticketType));
        // Mock count of PURCHASED tickets to be 9 (1 left)
        when(ticketRepository.countByTicketTypeIdAndStatus(ticketTypeId, TicketStatusEnum.PURCHASED)).thenReturn(9);
        when(ticketRepository.save(any(Ticket.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Ticket ticket = ticketTypeService.purchaseTicket(userId, ticketTypeId, request);

        assertNotNull(ticket);
        assertEquals(TicketStatusEnum.PURCHASED, ticket.getStatus());
        verify(ticketRepository).countByTicketTypeIdAndStatus(ticketTypeId, TicketStatusEnum.PURCHASED);
    }

    @Test
    void purchaseTicket_shouldFail_whenTicketsAreSoldOut() {
        UUID userId = UUID.randomUUID();
        UUID ticketTypeId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);

        TicketType ticketType = new TicketType();
        ticketType.setId(ticketTypeId);
        ticketType.setTotalAvailable(10);

        PurchaseTicketRequestDto request = new PurchaseTicketRequestDto();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(ticketTypeRepository.findByIdWithLock(ticketTypeId)).thenReturn(Optional.of(ticketType));
        // Mock count of PURCHASED tickets to be 10 (0 left)
        when(ticketRepository.countByTicketTypeIdAndStatus(ticketTypeId, TicketStatusEnum.PURCHASED)).thenReturn(10);

        assertThrows(TicketsSoldOutException.class, () -> {
            ticketTypeService.purchaseTicket(userId, ticketTypeId, request);
        });
    }
}
