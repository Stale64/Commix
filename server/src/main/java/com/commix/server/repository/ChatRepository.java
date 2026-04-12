package com.commix.server.repository;

import com.commix.server.model.data.ChatModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatModel, Integer> {
    List<ChatModel> findChatModelsByChatHash(String chatHash);
}
