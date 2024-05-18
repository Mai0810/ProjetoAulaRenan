-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `ID_USUARIO` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  `EMAIL` VARCHAR(45) NOT NULL,
  `SENHA` VARCHAR(20) NOT NULL,
  `ADMIN` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Produtor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Produtor` (
  `ID_PRODUTOR` INT ZEROFILL NOT NULL,
  `DESCRICAO` VARCHAR(200) NULL,
  `ENDERECO` VARCHAR(150) NOT NULL,
  `TELEFONE` VARCHAR(100) NOT NULL,
  `Usuario_ID_USUARIO` INT NOT NULL,
  PRIMARY KEY (`ID_PRODUTOR`),
  INDEX `fk_Produtor_Usuario1_idx` (`Usuario_ID_USUARIO` ASC) VISIBLE,
  CONSTRAINT `fk_Produtor_Usuario1`
    FOREIGN KEY (`Usuario_ID_USUARIO`)
    REFERENCES `mydb`.`Usuario` (`ID_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Produto` (
  `ID_PRODUTO` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `DESCRICAO` VARCHAR(200) NULL,
  `PRECO` VARCHAR(100) NOT NULL,
  `TIPO` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID_PRODUTO`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Produtor_has_Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Produtor_has_Produto` (
  `Produtor_ID_PRODUTOR` INT ZEROFILL NOT NULL,
  `Produto_ID_PRODUTO` INT NOT NULL,
  PRIMARY KEY (`Produtor_ID_PRODUTOR`, `Produto_ID_PRODUTO`),
  INDEX `fk_Produtor_has_Produto_Produto1_idx` (`Produto_ID_PRODUTO` ASC) VISIBLE,
  INDEX `fk_Produtor_has_Produto_Produtor1_idx` (`Produtor_ID_PRODUTOR` ASC) VISIBLE,
  CONSTRAINT `fk_Produtor_has_Produto_Produtor1`
    FOREIGN KEY (`Produtor_ID_PRODUTOR`)
    REFERENCES `mydb`.`Produtor` (`ID_PRODUTOR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtor_has_Produto_Produto1`
    FOREIGN KEY (`Produto_ID_PRODUTO`)
    REFERENCES `mydb`.`Produto` (`ID_PRODUTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
