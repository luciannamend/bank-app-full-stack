package com.lucianna.mendonca.lucianna_finaltest_comp303a.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "bank")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Bank {

    // • BankID – primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bank_id")
    private Long bankId;

    // • BankName – name of the bank
    @NotBlank(message = "Name cannot be blank") // Ensures non-null and non-empty
    @Size(max = 200, message = "Name cannot exceed 200 characters")
    @Column(name = "bank_name", nullable = false, columnDefinition = "VARCHAR(200)", length = 200)
    private String bankName;

    // • BankYear – which year was the bank established/founded
    @NotNull(message = "Bank foundation year cannot be null")
    @Min(value = 1500, message = "Founded year must be after 1500")
    @Max(value = 2024, message = "Founded year cannot be in the future")  // Ensures it's not in the future
    @Column(name = "bank_year", nullable = false)
    private Integer bankYear;

    // • BankEmp – number of employees
    @NotNull(message = "Number of employees cannot be null")
    @Min(value = 1, message = "Number of employees must be at least 1")
    @Max(value = 1000000, message = "Number of employees cannot exceed 1M")//the largest bank in canada has ~100mi emp
    @Column(name = "bank_emp", nullable = false)
    private Integer bankEmp;

    // • BankAddress – complete address of the bank
    @NotBlank(message = "Address cannot be blank")
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    @Column(name = "bank_address", nullable = false, columnDefinition = "VARCHAR(500)", length = 500)
    private String bankAddress;

    // • BankBranches – number of branches of this bank
    @NotNull(message = "Number of branches cannot be null")
    @Min(value = 0, message = "Number of branches cannot be negative") //it can be 0 considering purely digital banks
    @Column(name = "bank_branches", nullable = false)
    private Integer bankBranches;

    // • BankATMs – number of ATMs of this bank
    @NotNull(message = "Number of ATMs cannot be null")
    @Min(value = 0, message = "Number of ATMs cannot be negative") //it can be 0 considering purely digital banks
    @Column(name = "bank_atms", nullable = false)
    private Integer bankATMs;

}
