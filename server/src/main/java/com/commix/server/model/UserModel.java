package com.commix.server.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@ToString
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    @Column(unique = true)
    private String username;
    private String password;

    @OneToMany
    private List<UserModel> friends;
}
