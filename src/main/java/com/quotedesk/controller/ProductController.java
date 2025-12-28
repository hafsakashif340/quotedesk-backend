package com.quotedesk.controller;

import com.quotedesk.dto.request.CreateProductDto;
import com.quotedesk.dto.response.ProductResponseDto;
import com.quotedesk.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(
        origins = "${frontend.url}"
)
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponseDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ProductResponseDto createProduct(@RequestBody CreateProductDto dto) {
        return productService.createProduct(dto);
    }

    @PutMapping("/{id}")
    public ProductResponseDto updateProduct(
            @PathVariable Long id,
            @RequestBody CreateProductDto dto
    ) {
        return productService.updateProduct(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/search")
    public List<ProductResponseDto> searchProducts(@RequestParam String description) {
        return productService.searchProducts(description);
    }
}
