# Kompletny Plan dla Dewelopera: Projekt Gawin-Home

**Do:** Deweloper Frontend

**Cel:** Stworzenie topowego, premium sklepu e-commerce z meblami, który łączy w sobie światowej klasy UX, wizualizację i sygnały zaufania.

---

## Wizja Nadrzędna

Nie budujemy "kolejnego" sklepu z meblami.

Budujemy **cyfrowe doświadczenie premium**, które prowadzi klienta od inspiracji po świadomy, pewny zakup.

Nasza filozofia to **"Perfekcja w prostocie"**, a estetyka to **"Styl Hybrydowy"**.

---

## Kluczowe Wnioski z Badań Rynku

Zakup mebli to **decyzja o wysokim zaangażowaniu** (high-consideration purchase).

Aby wygrać, musimy dostarczyć klientowi trzy rzeczy:

1. **WIZUALIZACJĘ**
2. **PEWNOŚĆ**
3. **FINANSOWANIE**

---

## Architektura Projektu: Plan Rozwoju w 3 Fazach

Aby projekt był możliwy do zrealizowania i od początku utrzymywał najwyższą jakość, dzielimy go na trzy strategiczne fazy.

---

## FAZA 1: Fundament Premium (MVP)

### Cel

Uruchomienie w pełni funkcjonalnego, pięknego i piekielnie szybkiego sklepu, który od pierwszego dnia buduje zaufanie i zachwyca designem.

Skupiamy się na **perfekcyjnym wykonaniu absolutnych podstaw**.

---

### Architektura Strony Głównej (Faza 1)

#### 1. Hero Section (zgodnie z pkt. 1 z badania)

**Wizja:** Kinematograficzne, pełnoekranowe wejście. Ma budzić emocje.

**Design:**

- Tryb "Elegancki" (ciemny)
- Tło w postaci wysokiej jakości **wideo** (prezentującego detal mebla w zwolnionym tempie) lub zdjęcia lifestyle'owego

**Treść:**

- Minimalistyczna
- Jeden, mocny nagłówek (np. "Twój Dom, Twoja Perfekcja")
- Krótki podtytuł
- Jeden, wyraźny przycisk CTA (wariant `primary`, złoty gradient)

**Wyróżniki:**

- Od razu widoczne **2-3 kluczowe propozycje wartości** (np. "Darmowa dostawa", "Gwarancja 10 lat")
- W postaci subtelnych ikon z tekstem

---

#### 2. Nawigacja i Mega Menu (pkt. 2)

**Wizja:** Błyskawiczny dostęp do całej oferty.

**Struktura:**

- Główne kategorie ("Łóżka", "Sofy") rozwijane w **mega menu**
- Zawiera podkategorie (np. "wg. Stylu", "wg. Rozmiaru")
- Zawiera inspirujące zdjęcie aranżacji
- Nawigacja musi być **lepka (sticky)** podczas przewijania

---

#### 3. Polecane Produkty / Bestsellery (pkt. 4)

**Wizja:** Serce strony głównej, prezentujące naszą najlepszą ofertę.

**Design:**

- Tryb "Showroom" (jasny), aby skupić uwagę na produktach

**Funkcjonalność (Krytyczne):**

**Siatka produktów:**

- 3-4 kolumny na desktopie

**Interaktywna Karta Produktu:**

Po najechaniu myszką, musi zawierać:

1. ✅ Zdjęcie produktu zmienia się na **drugie ujęcie** (np. inna perspektwa)
2. ✅ Widoczna ikona **serca** (wishlist)
3. ✅ Widoczne **miniatury dostępnych kolorów** (swatches)
4. ✅ Widoczne **kluczowe wymiary** (np. "Szerokość: 220 cm")
5. ✅ **Cena + opcja ratalna** (np. "2499 zł lub 208 zł/mc")
6. ✅ Widoczne **oceny w gwiazdkach** (np. 4.8 ★)
7. ✅ Subtelne **etykiety (badges)**: "NOWOŚĆ", "PROMOCJA"

---

#### 4. Inspiracje (Lifestyle Imagery) (pkt. 6)

**Wizja:** Pokazanie mebli w kontekście aspiracyjnych, pięknych wnętrz. Sprzedajemy marzenie, nie tylko produkt.

**Design:**

- Pełnoekranowy baner lub sekcja z kilkoma dużymi zdjęciami

**Funkcjonalność:**

- Zdjęcia muszą być **"shoppable"**
- Po najechaniu na aranżację powinny pojawić się **tagi na poszczególnych produktach**
- Umożliwiające przejście do ich kart

---

#### 5. Sygnały Zaufania (Social Proof) (pkt. 8)

**Wizja:** Zbudowanie natychmiastowej wiarygodności.

**Komponenty:**

1. **Minimalistyczna karuzela** z 2-3 wybranymi opiniami klientów ("Verified Buyer")

2. **Sekcja z logotypami** partnerów płatności:

   - Przelewy24, Blik, Visa
   - Certyfikaty (np. FSC)

3. **Wyraźnie widoczne informacje:**
   - "30 dni na zwrot"
   - "10 lat gwarancji"

---

#### 6. Newsletter i Stopka (pkt. 14, 20)

**Wizja:** Zakończenie strony w profesjonalny sposób i zebranie leadów.

**Design:**

- Stopka w Trybie "Eleganckim" (ciemnym)

**Funkcjonalność:**

- Stopka musi być **rozbudowanym hubem informacyjnym** z linkami do wszystkich podstron
- Formularz newslettera prosty i zachęcający (**-10% na pierwsze zakupy**)

---

## FAZA 2: Wzbogacenie Doświadczenia i Konwersji

### Cel

Po zbudowaniu solidnych fundamentów, dodajemy zaawansowane funkcje, które zwiększą zaangażowanie i sprzedaż.

---

### Funkcje Fazy 2

#### 1. Sekcja Promocyjna (pkt. 3)

- Wprowadzenie **banerów z licznikami czasu** do końca promocji
- Dedykowana sekcja o **finansowaniu** (raty 0%, kup teraz, płać później)

---

#### 2. Zaawansowany Social Proof (pkt. 8)

- Integracja z **Instagramem**
- Galeria zdjęć od klientów (**UGC - User Generated Content**)
- Z **otagowanymi produktami**

---

#### 3. Blog / Content Hub (pkt. 13)

- Stworzenie sekcji z:
  - Poradnikami
  - Przewodnikami po stylach
  - Inspiracjami
- **Kluczowe dla SEO** i budowania wizerunku eksperta

---

#### 4. Porównywarka Produktów (pkt. 9)

- Narzędzie pozwalające na **porównanie 2-3 modeli** łóżek lub sof obok siebie
- Porównanie: wymiary, materiał, funkcje, cena

---

## FAZA 3: Innowacja i Dominacja na Rynku

### Cel

Wprowadzenie przełomowych technologii, które wyróżnią nas na tle całej konkurencji w Europie.

---

### Funkcje Fazy 3

#### 1. Konfigurator 3D i Wizualizacja AR (pkt. 5)

⭐ **Najwyższy priorytet**

**Funkcjonalność:**

- Narzędzie pozwalające klientowi na zmianę:
  - Tkaniny
  - Koloru
  - Nóżek mebla
- **W czasie rzeczywistym**
- Umieszczenie mebla w swoim pokoju za pomocą aparatu w telefonie (**WebAR**)

---

#### 2. Live Chat & Wirtualne Konsultacje (pkt. 10)

- Wdrożenie zaawansowanego czatu
- Możliwość umówienia **wideo-konsultacji z projektantem wnętrz**

---

#### 3. Interaktywne Narzędzia (pkt. 11)

- Dodanie **wirtualnego planera pokoju**
- Opcja zamówienia **darmowych próbek tkanin**

---

## Finalna Wizja dla Dewelopera

Twoim zadaniem jest **przełożenie tej wizji na kod**.

### Priorytet: FAZA 1

**Musi być wykonana perfekcyjnie**, z dbałością o każdy detal opisany w specyfikacji "Stylu Hybrydowego".

### Wymagania Techniczne

**Kod musi być:**

- ✅ Czysty
- ✅ Skalowalny
- ✅ Gotowy na rozbudowę o funkcje z Fazy 2 i 3

### Najważniejsze

⚠️ **Pamiętaj, że budujemy doświadczenie, a nie tylko stronę internetową.**

---

## Podsumowanie Faz

| Faza       | Cel                       | Status            |
| ---------- | ------------------------- | ----------------- |
| **FAZA 1** | Fundament Premium (MVP)   | 🔴 Do rozpoczęcia |
| **FAZA 2** | Wzbogacenie Doświadczenia | 🔵 Planowane      |
| **FAZA 3** | Innowacja i Dominacja     | 🔵 Planowane      |

---

## Checklist Fazy 1

### Hero Section

- [ ] Pełnoekranowe wideo/zdjęcie w tle
- [ ] Ciemna nakładka (`bg-brand-charcoal/70`)
- [ ] Nagłówek Display + podtytuł
- [ ] Przycisk CTA (primary, gradient)
- [ ] 2-3 ikony z propozycjami wartości

### Nawigacja

- [ ] Mega menu z podkategoriami
- [ ] Zdjęcia aranżacji w menu
- [ ] Sticky navigation podczas scroll

### Produkty / Bestsellery

- [ ] Siatka 3-4 kolumny (responsive)
- [ ] Hover: zmiana zdjęcia na drugie ujęcie
- [ ] Ikona serca (wishlist)
- [ ] Swatches kolorów
- [ ] Widoczne wymiary
- [ ] Cena + opcja ratalna
- [ ] Gwiazdki (rating)
- [ ] Badges (NOWOŚĆ, PROMOCJA)

### Inspiracje (Lifestyle)

- [ ] Pełnoekranowe banery ze zdjęciami
- [ ] Shoppable images (tagi produktów)
- [ ] Hover interactions

### Social Proof

- [ ] Karuzela z opiniami klientów
- [ ] Logotypy płatności i certyfikatów
- [ ] Widoczne: "30 dni na zwrot", "10 lat gwarancji"

### Newsletter & Footer

- [ ] Formularz newsletter z zachętą (-10%)
- [ ] Stopka ciemna (Tryb Elegancki)
- [ ] Rozbudowane linki do wszystkich podstron
- [ ] Logo i info o firmie

---

**Wersja dokumentu:** 1.0.0
**Data:** 2025-10-15
**Status:** 🟢 Obowiązujący plan rozwoju
