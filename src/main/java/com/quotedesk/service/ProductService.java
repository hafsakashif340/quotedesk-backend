package com.quotedesk.service;

import com.quotedesk.dto.request.CreateProductDto;
import com.quotedesk.dto.response.ProductResponseDto;
import com.quotedesk.model.Product;
import com.quotedesk.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponseDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    public ProductResponseDto createProduct(CreateProductDto dto) {
        Product product = new Product();

        product.setMake(dto.getMake());
        product.setModel(dto.getModel());
        product.setDescription(dto.getDescription());
        product.setQuantity(dto.getQuantity());
        product.setUnitPrice(dto.getUnitPrice());

        product.setTotalPrice(
                dto.getUnitPrice().multiply(BigDecimal.valueOf(dto.getQuantity()))
        );

        Product saved = productRepository.save(product);
        return mapToResponseDto(saved);
    }

    public ProductResponseDto updateProduct(Long id, CreateProductDto dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setMake(dto.getMake());
        existing.setModel(dto.getModel());
        existing.setDescription(dto.getDescription());
        existing.setQuantity(dto.getQuantity());
        existing.setUnitPrice(dto.getUnitPrice());

        existing.setTotalPrice(
                dto.getUnitPrice().multiply(BigDecimal.valueOf(dto.getQuantity()))
        );

        Product updated = productRepository.save(existing);
        return mapToResponseDto(updated);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    private ProductResponseDto mapToResponseDto(Product product) {
        ProductResponseDto dto = new ProductResponseDto();

        dto.setId(product.getId());
        dto.setMake(product.getMake());
        dto.setModel(product.getModel());
        dto.setDescription(product.getDescription());
        dto.setQuantity(product.getQuantity());
        dto.setUnitPrice(product.getUnitPrice());
        dto.setTotalPrice(product.getTotalPrice());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());

        return dto;
    }

    public List<ProductResponseDto> searchProducts(String query) {
        return productRepository.findByDescriptionContainingIgnoreCase(query)
                .stream()
                .map(this::mapToResponseDto) // Assuming you have a mapping helper
                .collect(Collectors.toList());
    }
}
