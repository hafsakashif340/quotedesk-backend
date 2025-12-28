package com.quotedesk.service;

import com.quotedesk.model.User;
import com.quotedesk.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    public User getUser(Integer id)
    {
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user)
    {
        // 1. Encode the raw password
        String encoded = bCryptPasswordEncoder.encode(user.getPassword());

        // 2. Set it to the passwordHash field
        user.setPasswordHash(encoded);

        // 3. (Optional) Clear the plain text password field for security
        user.setPassword(null);
        return userRepository.save(user);
    }

    public User updateUser(User user)
    {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id)
    {
        userRepository.deleteById(id);
    }

    public boolean authenticate(String username, String password)
    {
        User user = userRepository.findByUsername(username);
        // 1. Check if the object is null first!
        if (user == null) {
            throw new UsernameNotFoundException("User does not exist in the database");
        }
        if(!user.getUsername().equals(username))
        {
            throw new UsernameNotFoundException("User does not exist in the databse");
        }

        if(!bCryptPasswordEncoder.matches(password, user.getPasswordHash()))//!user.getPasswordHash().equals(bCryptPasswordEncoder.encode(password)))
        {
            throw new BadCredentialsException("The password is incorrect");
        }

        return true;
    }
}
