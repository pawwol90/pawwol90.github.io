# Test - Pizza

## Test

Wykonaj [test](http://bit.ly/AkademiaMP_P2T2)

## Zadanie praktyczne

[Przykład Implementacji Do Pobrania](Download/Pizza.zip)

Napisz program, który umożliwi obliczenie ceny pizzy.

### Program powinien umożliwiać:
1. Wybór rozmiaru pizzy (Mała/Średnia/Duża) – Może być wybrana tylko jedna opcja!
2. Wybór formy dostawy (Na miejscu/Dostawa) – Może być wybrana tylko jedna opcja!
3. Wybór standardowych rodzajów pizzy - Może być wybrana tylko jedna opcja!
4. Dodatkowo jako jedna z opcji wśród rodzajów pizzy powinna znaleźć się `Własna pizza` - która daje możliwość wyboru dowolnych składników
5. Zaznaczanie składników
   1. Jeżeli użytkownik wybierze konkretną pizzę to autoamtycznie powinny zaznaczyć składniki pizzy
   2. Jeżeli użytkownik wybierze opcję `Własna pizza` to odblokuj składniki tak aby użytkownik mógł zaznaczyć wybrane składniki.
6. Obliczaj odpowiednio cenę pizzy dla wybranego jej rodzaju w zależności od składników, rozmiaru oraz formy dostawy.

### Zasady obliczania ostatecznej ceny pizzy:
1. Wybór danego rodzaju pizzy zmienia zaznaczone dodatki zależnie od jej składu.
2. Zmiana wybranych składników aktualizuje cene pizzy - ustal cenę poszczególnych składników, sumuj ich cene.
3. Zmiana rozmiaru pizzy aktualizuje cene.
4. Ostateczna cena składników powinna być uzależniona od wybranej wielkości pizzy np.:
   1. Mała pizza: suma ceny składników na pizzy * 1, 
   2. Średnia pizza: suma ceny składników na pizzy * 1.5, 
   3. Duża pizza: suma ceny składników na pizzy * 2.
5. Jeżeli wybrano dostawę to należy do ceny dodać stałą kwotę za dostawę.
6. Zmiana sposobu dostarczenia pizzy również aktualizuje cenę.

### Cene pizzy należy aktualizować, gdy:
1. Zmieni się zaznaczenie rozmiarów pizzy
2. Zmieni się sposób dostawy pizzy
3. Zmieni się zaznaczenie poszczególnych dodatków

Najlepiej obliczaj cene pizzy za pomocą osobnej funkcji, któa sprawdzi jakie składniki są zaznaczone, następnie doda ewentualną stałą kwotę za dostawe oraz przeliczy odpowiednio kwotę dodatków zależności od wybranego rozmiaru pizzy. Funkcja obliczania pizzy powinna być podpięta do zdarzeń kontrolek służących do czynności wypisanych w punkcach powyżej. 

### Zaznaczaj autoamtycznie doatki gdy:
1. Zmieni się rodzaj zaznaczonej pizzy

Warto napisać osobną funkcję, która najpierw zresetuje zaznaczenie wszystkich dodatków, a następnie zależnie od tego czy wybrano włąsną pizzę czy nie to włączy lub wyłączy możliwość wyboru składników. Jeśli zaznaczona pizza nie bedzie własną autorską pizza użytkownika powinny zaznaczyć się automatycznie składniki danej pizzy.

### Kolejność działań
Poniższe kroki ułatwią Ci uniknąć zbędnych komplikacji:
1. Dodaj możliwość wyboru poszczególnych rodzajów pizzy (bez własnej).
2. Dodaj część z dodatkami pizzy.
3. Dodaj pola do wyświetlania ceny.
4. Dodaj zdarzenia na zaznaczenie rodzajów pizzy.
5. Napisz funkcję do resetu zaznaczenia dodatków. Resetuj zawsze zaznaczenie wszystkich dodatków (reset zaznaczenia to inaczej ustawienie Checked = false).
6. Wywołaj funcję resetu dodatków dla zmiany zaznaczenia rodzajów pizzy.
7. Zaznacz poszczególne dodatki wewnątrz zdarzeń dla zmiany zaznaczenia danej pizzy zaraz po zresetowaniu zaznaczenia wszystkich dodatków. Pamiętaj, aby przed zaznaczeniem dodatków sprawdzić czy dana pizza jest obecnie zaznaczona.
8. Dodaj opcję własnej pizzy, która umożliwi zmianę zaznaczenia na dodatkach.
9. Dodaj opcję dodatkowych dodatków, która również umożliwi zmianę zaznaczenia w dodatkach.
10. Napisz funkcję liczącą cene pizzy na podstawie zaznaczonych dodatków. Należy stworzyć zmienną, która przechowa sumaryczną cenę pizzy i w zależności od tego czy dany dodatek jest zaznaczony należy dodawać cene za niego.
11. Niech funkcja licząca cene również zmieni wyświetlaną na ekranie cenę pizzy.
12. Dodaj możliwość wyboru rozmiaru pizz.
13. Zdarzenie zmiany zaznaczenia rozmiarów pizzy wywołuje funkcję liczącą cene pizzy (patrz punkt 10).
14. Do funkcji liczącej cene pizzy (patrz punkt 10) napisz dodatkowe funkcjionalności:
a. Dodawanie stałej kwoty za rozmiar ciasta.
b. Zmiana mnożnik sumarycznej ceny dodatków zależnie od rozmiaru.
15. Dodaj możliwość wyboru sposobu dostawy (na miejscu/dostawa).
16. Podczas zmiany zaznaczenia opcji sposobu dostawy wywołaj funcję liczącą cenę pizzy (patrz punkt 10)
17. Dodaj do funkcji liczącej cene pizzy (patrz punkt 10) dodatkową obsługę kwotę za dostawę dodawaną do ceny pizzy.


|Zamówienie|Mała Margherita w dostawie|Średnia Margherita na miejscu|
|-|-|-|
|**Cena za samo ciasto**| 6| 7|
|**Przelicznik ceny dodatków**| 1| 1.5|
|**Ceny dodatków**|Sos pomidorowy  = 1, Mozzarella = 1.5| Sos pomidorowy  = 1, Mozzarella = 1.5|
|**Suma za dodatki**|2.5|2.5|
|**Suma za dodatki * Przelicznik ceny dodatków**|2.5 * 1 = 2.5|2.5 * 1.5 = 3.75|
|**Cena dostawy**| 6| 0 (na miejscu)|
|**Ostateczna cena pizzy (To wyświetlamy):**| 6(Ciasto) + 2.5 (dodatki) + 6 (Dostawa) = **14.5**|7(Ciasto) + 3.75 (dodatki) + 0 (Dostawa) = **10.75**|
