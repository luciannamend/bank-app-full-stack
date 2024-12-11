package com.lucianna.mendonca.lucianna_finaltest_comp303a.repository;

import com.lucianna.mendonca.lucianna_finaltest_comp303a.model.Bank;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {

    Bank findFirstByBankNameContainingIgnoreCase(String bankName);
}
