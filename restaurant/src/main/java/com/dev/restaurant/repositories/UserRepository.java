package com.dev.restaurant.repositories;


import com.dev.restaurant.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByEmail(String email);

    @Query(value = """
                SELECT u.* FROM users u WHERE
                       (:id = -1 OR u.id = :id) AND
                       (LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND
                       (CONCAT(LOWER(u.firstName),' ',LOWER(u.lastName)) LIKE LOWER(CONCAT('%', :name, '%'))) AND
                       (LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :phoneNumber, '%')))
            """, countQuery = """
                SELECT COUNT(u.id) FROM users u WHERE
                       (:id = -1 OR u.id = :id) AND
                       (LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND
                       (CONCAT(LOWER(u.firstName),' ',LOWER(u.lastName)) LIKE LOWER(CONCAT('%', :name, '%'))) AND
                       (LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :phoneNumber, '%')))
            """, nativeQuery = true)
    Page<User> findUsersWithPaginationAndSort(
            @Param("id") int id,
            @Param("email") String email,
            @Param("name") String name,
            @Param("phoneNumber") String phoneNumber,
            Pageable pageable
    );

 }