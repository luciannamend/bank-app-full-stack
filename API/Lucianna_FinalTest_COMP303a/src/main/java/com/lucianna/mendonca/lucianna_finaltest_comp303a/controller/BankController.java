package com.lucianna.mendonca.lucianna_finaltest_comp303a.controller;

import com.lucianna.mendonca.lucianna_finaltest_comp303a.model.Bank;
import com.lucianna.mendonca.lucianna_finaltest_comp303a.repository.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/banks") //base url
@CrossOrigin(origins = "http://localhost:5173") // allow webapp requests
public class BankController {

    @Autowired
    private BankRepository bankRepository;


    // • Get a list of all the Banks in the “Bank” table
    @GetMapping
    public ResponseEntity<List<Bank>> getAllBanks(){
        return ResponseEntity.of(Optional.of(bankRepository.findAll()));
    }

    // • Get a Bank via BankID
    @GetMapping("/by-id/{bankId}")
    public ResponseEntity<Bank> getBankById(@PathVariable Long bankId) {
        return bankRepository.findById(bankId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // • Get a Bank via BankName
    @GetMapping("/by-name/{bankName}")
    public ResponseEntity<Bank> getBankByName(@PathVariable String bankName) {
        Bank bank = bankRepository.findFirstByBankNameContainingIgnoreCase(bankName);
        if (bank == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bank);
    }

    // • Add a Bank to the “Bank” Table
    @PostMapping()
    public ResponseEntity<Bank> createBank(@RequestBody Bank bank){
        if(bank == null){
            System.out.println("Bank is null");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(bankRepository.save(bank));
    }

    // • Update a Bank via BankID
    @PutMapping("/by-id/{bankId}")
    public ResponseEntity<Bank> updateBankById(@PathVariable Long bankId, @RequestBody Bank bank){
        if(bankId == null){
            System.out.println("Bank Id is null");
            return ResponseEntity.notFound().build(); // 404
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(bankRepository.save(bank));
    }

    // • Update a Bank via BankName
    @PutMapping("/by-name/{bankName}")
    public ResponseEntity<Bank> updateBankByName(@PathVariable String bankName, @RequestBody Bank updatedBank) {
        Bank existingBank = bankRepository.findFirstByBankNameContainingIgnoreCase(bankName);
        if (existingBank == null) {
            return ResponseEntity.notFound().build();
        }
        // Merge fields
        existingBank.setBankName(updatedBank.getBankName());
        existingBank.setBankYear(updatedBank.getBankYear());
        existingBank.setBankEmp(updatedBank.getBankEmp());
        existingBank.setBankAddress(updatedBank.getBankAddress());
        existingBank.setBankBranches(updatedBank.getBankBranches());
        existingBank.setBankATMs(updatedBank.getBankATMs());

        return ResponseEntity.ok(bankRepository.save(existingBank));
    }

    // • Delete a Bank via BankID
    @DeleteMapping("/by-id/{bankId}")
    public ResponseEntity<Void> deleteBankById(@PathVariable Long bankId) {
        if (!bankRepository.existsById(bankId)) {
            return ResponseEntity.notFound().build();
        }
        bankRepository.deleteById(bankId);
        return ResponseEntity.ok().build();
    }

    // • Delete a Bank via BankName
    @DeleteMapping("/by-name/{bankName}")
    public ResponseEntity<Bank> deleteBankByName(@PathVariable String bankName){
        if (bankName.isEmpty()){
            System.out.println("Bank name is empty");
            return ResponseEntity.notFound().build(); // 404
        }
        System.out.println("DELETING BANK BY NAME: " + bankName);
        Bank bankToDelete = bankRepository.findFirstByBankNameContainingIgnoreCase(bankName);
        System.out.println("DELETING BANK: " + bankToDelete.getBankName());
        bankRepository.delete(bankToDelete);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
