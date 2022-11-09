package app.bada.flower.api.controller.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    protected ResponseEntity handleExpiredJwtException(ExpiredJwtException e) {
//        System.out.println("----- ExpiredJwtException Handled -----");
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
