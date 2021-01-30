package com.example.fileSharing.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@EqualsAndHashCode(callSuper = true)
@Data
public class LoginDto extends PasswordDto {
  @NotBlank(message = "Email must not be empty")
  @Size(max = 255, message = "The length of email must be less than 255")
  @Pattern(
    regexp = ".*@.*",
    message = "Email must have '@' symbol"
  )
  protected String email;
}
