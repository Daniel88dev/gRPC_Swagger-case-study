# Zadání úkolu – Node.js aplikace (Server + Client)

## 1. Vytvoř NodeJS aplikaci (Server) dle zadání (snaž se využít doporučené technologie):

### 1.1 Implementuj případy užití:
- Založení uživatele
- Získání detailu uživatele
- Získání seznamu uživatelů
- Přihlášení uživatele

### 1.2 Server musí běžet na URL adrese: http://localhost:8081

---

## 2. Vytvoř druhou NodeJS aplikaci (Client), která bude komunikovat se serverem pomocí gRPC frameworku:

### 2.1 Server (Client app) musí běžet na adrese: http://localhost:8091

### 2.2 Aplikace musí:
- Nezkolabovat při vrácení chyby ze serveru, ale pouze chybu zalogovat do konzole.
- Obsahovat soubor `users-init.json` s minimálně 12 uživateli pro založení.

### 2.3 Po spuštění aplikace proběhne následující sekvence:

1. **Založení uživatelů** načtených ze souboru `users-init.json`  
   → Vypíše všechna ID těchto uživatelů v rámci jednoho řádku do konzole s vhodnou hláškou.

2. **Načtení seznamu uživatelů:**
    - 5 uživatelů na **2. stránce**  
      → Vypíše data do jednoho řádku v konzoli.
    - 10 uživatelů na **2. stránce**  
      → Vypíše data do jednoho řádku v konzoli.

3. **Pokus o založení uživatele se stejným emailem**  
   → Vypíše odpověď ze serveru do jednoho řádku v konzoli.

4. **Přihlášení jednoho uživatele**  
   → Vypíše odpověď ze serveru do jednoho řádku v konzoli.

---

## 3. Git repozitář

- Kód nahraj na **GitLab** nebo **GitHub**.
- Přidej přístup k repozitáři pro:
    - `petr.volf@marketing.bi`
    - `daniel.maczak@marketing.bi`

### 3.1 Součástí repozitáře budou:
- Zdrojové kódy obou aplikací (Server + Client)

---

## Požadavky / Doporučení na technologie

> **Požadované technologie jsou označeny \***  
> Ostatní jsou pouze doporučené dle potřeby.

- **DB**\*  
  → Použij `JSON-server` jako mockovací službu.

- **NodeJS**\*
- **Express**\*
- **TypeScript**\*
- Swagger / Open API  
  → Pro generování controllerů a definici API můžeš využít `TSOA`.
- Postman
- Bcrypt
- gRPC
- (volitelně) NestJS pro A i B variantu

---

## Případy užití (Use Cases)

### 1. Založení uživatele
- **Vstupní objekt:**
    - Jméno
    - Příjmení
    - Název firmy
    - Email (unikátní)
    - Heslo
- **Výstup:**
    - ID uživatele

---

### 2. Získání detailu uživatele
- **Vstup:**
    - ID uživatele
- **Výstup:**
    - ID
    - Jméno
    - Příjmení
    - Firma
    - Email

---

### 3. Získání seznamu uživatelů
- Stránkovaný seznam (max. 25 záznamů), seřazeno vzestupně dle emailu.
- Query parametry:
    - `offset` – začíná na 0, pouze pozitivní celá čísla
    - `limit` – pevně dané hodnoty: 5, 10, 25
- **Výstup:**
    - ID
    - Email

---

### 4. Přihlášení uživatele
- **Vstup:**
    - Email
    - Heslo
- **Výstup:**
    - JWT token obsahující:
        - ID uživatele
        - `iat` – datum a čas vytvoření
        - `exp` – platnost (1 hodina)
        - `alg` = `HS256`