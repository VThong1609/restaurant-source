package com.dev.restaurant.models;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseObject<T> {
    private String status;
    private String message;
    private T data;

}
