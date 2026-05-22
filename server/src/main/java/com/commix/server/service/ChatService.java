package com.commix.server.service;

import com.commix.server.dto.MessageDTO;
import com.commix.server.model.MessageModel;
import com.commix.server.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    private String getHash(String a, String b) {
        try {
            String combined = a + b;
            char[] chars = combined.toCharArray();
            Arrays.sort(chars);
            String sorted = new String(chars);

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(sorted.getBytes());

            StringBuilder hex = new StringBuilder();
            for (byte b1 : hashBytes) {
                hex.append(String.format("%02x", b1));
            }

            return hex.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public void addMessage(MessageDTO messageModel) {
        String chatHash = getHash(messageModel.getSender(), messageModel.getReceiver());
        MessageModel chatModel = new MessageModel();
        chatModel.setChatHash(chatHash);
        chatModel.setSender(messageModel.getSender());
        chatModel.setMessage(messageModel.getMessage());
        chatModel.setTimestamp(Instant.now());
        chatRepository.save(chatModel);
    }


    public List<MessageModel> getAllContactMessages(String username, String contact) {
        String chatHash = getHash(username, contact);
        return chatRepository.findChatModelsByChatHash(chatHash);
    }
}
