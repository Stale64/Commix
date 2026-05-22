package com.commix.server.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageDTO {
    private String sender;
    private String receiver;
    private String message;
}
