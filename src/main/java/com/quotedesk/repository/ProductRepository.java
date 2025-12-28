package com.quotedesk.repository;

import com.quotedesk.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByDescriptionContainingIgnoreCase(String description);
}
