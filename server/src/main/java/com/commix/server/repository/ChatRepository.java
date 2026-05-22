package com.commix.server.repository;

import com.commix.server.model.MessageModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<MessageModel, Integer> {
    List<MessageModel> findChatModelsByChatHash(String chatHash);
}
