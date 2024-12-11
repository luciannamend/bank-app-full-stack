package com.lucianna.mendonca.lucianna_finaltest_comp303a.repository;

import com.lucianna.mendonca.lucianna_finaltest_comp303a.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {
}
