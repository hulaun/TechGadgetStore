package com.example.demo.dto;

import com.example.demo.models.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class VerificationCodeDto {

    private Long id;
    private String code;
}
