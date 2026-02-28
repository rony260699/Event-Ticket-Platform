package com.devtiro.tickets.services.impl;

import com.devtiro.tickets.domain.entities.Ticket;
import com.devtiro.tickets.services.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    @Override
    public void sendTicketConfirmation(Ticket ticket) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(ticket.getPurchaser().getEmail());
            message.setSubject("Ticket Purchase Confirmation - " + ticket.getTicketType().getEvent().getName());

            String emailBody = String.format(
                    "Hello %s,\n\n" +
                            "Your ticket purchase was successful!\n\n" +
                            "Event: %s\n" +
                            "Ticket Type: %s\n" +
                            "Price Paid: %.2f\n" +
                            "Ticket ID: %s\n\n" +
                            "Thank you for using our platform!",
                    ticket.getPurchaser().getName(),
                    ticket.getTicketType().getEvent().getName(),
                    ticket.getTicketType().getName(),
                    ticket.getPricePaid(),
                    ticket.getId());

            message.setText(emailBody);
            mailSender.send(message);
            log.info("Email sent to {}", ticket.getPurchaser().getEmail());
        } catch (Exception e) {
            log.error("Failed to send email to {}", ticket.getPurchaser().getEmail(), e);
        }
    }

    @Override
    public void sendTicketCancellation(Ticket ticket) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(ticket.getPurchaser().getEmail());
            message.setSubject("Ticket Cancellation Confirmation - " + ticket.getTicketType().getEvent().getName());

            String emailBody = String.format(
                    "Hello %s,\n\n" +
                            "Your ticket for the following event has been cancelled:\n\n" +
                            "Event: %s\n" +
                            "Ticket Type: %s\n" +
                            "Refund Amount: %.2f\n" +
                            "Ticket ID: %s\n\n" +
                            "If you have any questions, please contact support.",
                    ticket.getPurchaser().getName(),
                    ticket.getTicketType().getEvent().getName(),
                    ticket.getTicketType().getName(),
                    ticket.getPricePaid(), // Or refund amount logic if different
                    ticket.getId());

            message.setText(emailBody);
            mailSender.send(message);
            log.info("Cancellation email sent to {}", ticket.getPurchaser().getEmail());
        } catch (Exception e) {
            log.error("Failed to send cancellation email to {}", ticket.getPurchaser().getEmail(), e);
        }
    }
}
