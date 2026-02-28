import {
  CreateEventRequest,
  EventDetails,
  EventStats,
  EventSummary,
  isErrorResponse,
  PublishedEventDetails,
  PublishedEventSummary,
  SpringBootPagination,
  TicketDetails,
  TicketSummary,
  TicketValidationRequest,
  TicketValidationResponse,
  UpdateEventRequest,
  EventAttendee,
  Page,
  PurchaseTicketRequest,
} from "@/domain/domain";

export const createEvent = async (
  accessToken: string,
  request: CreateEventRequest,
): Promise<void> => {
  const response = await fetch("/api/v1/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const updateEvent = async (
  accessToken: string,
  id: string,
  request: UpdateEventRequest,
): Promise<void> => {
  const response = await fetch(`/api/v1/events/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listEvents = async (
  accessToken: string,
  page: number,
): Promise<SpringBootPagination<EventSummary>> => {
  const response = await fetch(`/api/v1/events?page=${page}&size=2`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as SpringBootPagination<EventSummary>;
};

export const getEvent = async (
  accessToken: string,
  id: string,
): Promise<EventDetails> => {
  const response = await fetch(`/api/v1/events/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as EventDetails;
};

export const deleteEvent = async (
  accessToken: string,
  id: string,
): Promise<void> => {
  const response = await fetch(`/api/v1/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const responseBody = await response.json();
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listPublishedEvents = async (
  page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
  const response = await fetch(`/api/v1/published-events?page=${page}&size=4`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as SpringBootPagination<PublishedEventSummary>;
};

export const searchPublishedEvents = async (
  query: string,
  category: string,
  page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
  const qParam = query ? `q=${query}` : "";
  const catParam = category ? `category=${category}` : "";
  const sep = qParam && catParam ? "&" : "";

  const response = await fetch(
    `/api/v1/published-events?${qParam}${sep}${catParam}&page=${page}&size=4`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as SpringBootPagination<PublishedEventSummary>;
};

export const getPublishedEvent = async (
  id: string,
): Promise<PublishedEventDetails> => {
  const response = await fetch(`/api/v1/published-events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as PublishedEventDetails;
};

export const purchaseTicket = async (
  token: string,
  eventId: string,
  ticketTypeId: string,
  request: PurchaseTicketRequest,
): Promise<void> => {
  const response = await fetch(
    `/api/v1/events/${eventId}/ticket-types/${ticketTypeId}/tickets`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    const responseBody = await response.json();
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listTickets = async (
  accessToken: string,
  page: number,
): Promise<SpringBootPagination<TicketSummary>> => {
  const response = await fetch(`/api/v1/tickets?page=${page}&size=8`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as SpringBootPagination<TicketSummary>;
};

export const getTicket = async (
  accessToken: string,
  id: string,
): Promise<TicketDetails> => {
  const response = await fetch(`/api/v1/tickets/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as TicketDetails;
};

export const getTicketQr = async (
  accessToken: string,
  id: string,
): Promise<Blob> => {
  const response = await fetch(`/api/v1/tickets/${id}/qr-codes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return await response.blob();
  } else {
    throw new Error("Unable to get ticket QR code");
  }
};

export const validateTicket = async (
  accessToken: string,
  request: TicketValidationRequest,
): Promise<TicketValidationResponse> => {
  const response = await fetch(`/api/v1/ticket-validations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as Promise<TicketValidationResponse>;
};

export const cancelTicket = async (
  token: string,
  ticketId: string,
): Promise<void> => {
  const response = await fetch(`/api/v1/tickets/${ticketId}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to cancel ticket");
  }
};

export const getEventStats = async (
  token: string,
  eventId: string,
): Promise<EventStats> => {
  const response = await fetch(`/api/v1/events/${eventId}/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch event stats");
  }

  return await response.json();
};
export const getEventAttendees = async (
  token: string,
  eventId: string,
  page: number = 0,
  size: number = 10
): Promise<Page<EventAttendee>> => {
  const response = await fetch(`/api/v1/events/${eventId}/attendees?page=${page}&size=${size}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch event attendees");
  }

  return await response.json();
};
