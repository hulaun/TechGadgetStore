package com.example.demo.dto;

import com.example.demo.models.User;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String newPassword;

    public String getUsername() {
        return email==null?phoneNumber:email;
    }

    public User toUser(){
        return User.builder()
                .id(this.id)
                .email(this.email)
                .password(this.password)
                .phoneNumber(this.phoneNumber)
                .address(this.address)
                .build();
    }
}
