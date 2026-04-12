package com.commix.server.model.data;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@Entity
@ToString
@Table(name = "Chat")
public class ChatModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String chatHash;
    private String sender;
    private String message;
    private Instant timestamp;
}
