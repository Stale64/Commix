package com.commix.server.model.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MessageModel {
    private String sender;
    private String receiver;
    private String message;
    private Instant timestamp;
}
