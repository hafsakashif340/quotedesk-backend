package com.quotedesk.model;

import jakarta.persistence.*;
        import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
        import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@Getter
@Setter
public class Product {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private String country;
    private String gas;
    private String scope;
    private String description;

    private Integer quantity;

    private BigDecimal exWorkCost;
    private BigDecimal uaeVat;
    private BigDecimal fitting;
    private BigDecimal trp;
    private BigDecimal cdVat;
    private BigDecimal uC;
    private BigDecimal tC;
    private BigDecimal levie;

    private BigDecimal subTotal;
    private BigDecimal quotedUnitPrice;
    private BigDecimal totalPrice;
    private BigDecimal difference;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}

