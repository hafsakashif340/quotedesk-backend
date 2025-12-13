package com.quotedesk.service;

import com.quotedesk.model.Product;
import com.quotedesk.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    public ProductRepository productRepository;

    private List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    private Product createProduct(Product product) {
        return productRepository.save(product);
    }

    private Product updateProduct(Long id, Product product) {
        Product existing = productRepository.findById(id).orElseThrow();
        product.setId(existing.getId());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
