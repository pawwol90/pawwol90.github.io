# Temat 17 - Odmierzanie czasu

## [Materiały](Materiały.pdf)

## Liczenie czasu

Czasem w aplikacjach okienkowych konieczne jest wykoanie operacji w określonych interwałach czasowych lub po odczekaniu określonego czasu.

W powyższym celu służy kontrolka o nazwie `Timer`, której zastosowanie zgłębimy w ciągu najbliższych zajęć.

## Dodajemy kontrolkę z timerem

Aby dodać timer do naszej aplikacji należy dodać go tak samo jak każdą inną kontrolkę do okna - przeciągając ja z paska narzędzi na okno. W tym celu szukamy na liście kontrolki `Timer`.

![Timer - kontrolka](Grafiki/screen1.png)

Po przeciągnięciu jej na okno na dole pojawi się owa kontrolka - znajduje się ona w tym samym miejscu (na żółtym polu), gdzie pojawiały się w Notatniku nasze okna ładowania plików czy zmiany właściwości tekstu:

![Załadowany timer](Grafiki/screen2.png)

Po zaznaczeniu timer'a w oknie edytora okna, w zakładce properties pojawią się się właściwości, w których możemy ustawić:

![Timer properties](Grafiki/screen3.png)

| Właściwość | Wartość | Opis |
|-|-|-|
|Enabled|true/false|Oznacza czy dany timer jest włączony|
|Interval|czas w milisekundach|Oznacza czas odliczany przez timer, po odliczeniu czasu wywoływany jest event `tick`, o którym niżej|
|(Name)|Nazwa kontrolki|Nazwa używana w kodzie - tak jak w przypadku poprzednich kontrolek|

Pozostałe właściwości nie są dla nas obecnie istotne.

## Używamy timera

Po skonfigurowaniu nazwy i odpowiedniego interwału możemy wygenerować zdarzenie `Tick` timera. Wykonujemy to przy pomocy kliknięcia dwa razy na ikonkę timera w zakładce design. Okna mogą posiadać wiele timerów.

Po kliknięciu dwukrotnie na timer wygeneruje nam się funkcja, która zostanie wywołana w momencie gdy DZIAŁAJĄCY timer policzy odpowiedni interwał czasowy podany w właściwościach kontrolki.

W celu uruchomienia timera możemy ustawić właściwość `Enabled` na `true` - wtedy timer będzie działał od momentu uruchomienia naszej aplikacji. UWAGA: będzie on też od tego momentu odliczał czas i wykonywał zadania wewnątrz zdarzenia `Tick` (funkcja uruchomi się sama po odliczeniu zadanego czasu). Nie jest to najlepsze rozwiązanie, ale czasem stosowane.

Najlepiej jednak sterować timerem z poziomu kodu aplikacji. W tym celu używamy dwóch funkcji:

|Nazwa Funkcji|Opis działania|Przykład|
|-|-|-|
|*nazwa_timera*.Start()|Uruchamia timer|timer1.Start()|
|*nazwa_timera*.Stop()|Zatrzymuje timer|timer1.Stop()|

Funkcję Stop można wywołać na przykład wewnątrz funkcji Tick w celu zatrzymania timera po odliczeniu pojedynczego interwału czasowego. Wtedy taki timer po włączeniu (ręcznym lub automatycznym przy starcie) odliczy zadany czas i przestanie działać.

## Ćwiczenie 1 - zmiana tekstu na ekranie po interwale czasowym 

![Zmiana tekstu](Grafiki/screen4.png)

Wykonaj poniższe kroki:

1. Dodaj do okna Label, Button oraz Timer według obrazka.
2. Timer nazwij (przy pomocy właściwości (Name)): `zmianaTekstu`.
3. Ustaw interwał czasowy timera tak aby odliczał 2 sekundy. Pamiętaj, że timer liczy w milisekundach!
4. Przycisk nazwij: `zmianaTekstuPrzycisk`
5. Ustaw tekst przycisku na: *Kliknij i zaczekaj...*
6. Label nazwij: `tekst`
7. Ustaw właściwość `Text` Label'a na: `"Nic nie robię"`
8. Kliknij dwa razy na przycisk, aby dodać zdarzenie kliknięcia. W kodzie obsługującym przycik napisz kod, kóry uruchomi timer.
9. Wróć do zakładki *Design*
10. Kliknij dwukrotnie na Timer. I dodaj zdarzenie, w którym kod zrealizuje poniższe zadania:
    1. Ustawi tekst Label'a `tekst` na wybrany napis, inny niż ustawiony jako domyślny.
    2. Zatrzyma Timer za pomocą odpowiedniej funkcji.
11. Po uruchomieniu programu, naciśnięciu przycisku i odczekaniu 2 sekund powinien zmienić się napis na oknie.

## Ćwiczenie 2 - licznik

![Licznik](Grafiki/screen5.png)

Funkcja stop może również być wywoływana w innych miejscach. W ten sposób możemy zrobić prosty licznik sekund. Ćwiczenie wyknaj na tym samym projekcie aplikacji co poprzednie zadanie lub stwórz osobny projekt.

1. Dodaj do aplikacji: Label, Button oraz Timer
2. Timer nazwij (przy pomocy właściwości `(Name)`): `liczenie`
3. Ustaw interwał czasowy w timerze tak, aby odliczał on 1 sekundę.
4. Przycisk nazwij (właściwość `(Name)`): `LicznikPrzycisk`
5. Ustaw właściwość `Text` przycisku na: *Licz*
6. Label nazwij (właściwość `(Name)`): `licznik`
7. Ustaw tekst Label'a na: `"0"`
8. Kliknij na przycisk `Licz` dwukrotnie, aby stworzyć zdarzenie dla kliknięcia.
9. W kodzie aplikacji NAD funkcją `public MainForm()` dodaj zmienną:

   ```csharp
   int stanLicznika = 0;
   ```

10. W kodzie obsługującym przycisk wykonaj poniższe kroki:
    1. Sprawdź przy pomocy właściwości `Enabled` czy timer jest aktywny:
       1. **JEŻELI JEST AKTYWNY**:
          1. Zatrzymaj timer.
          2. Wyzeruj wartość zmiennej `stanLicznika`
          3. Ustaw tekst Label'a. Podpowiedź: `stanLicznika.ToString()`
       2. JEŻELI JEST **NIE**AKTYWNY - po prostu go uruchom za pomocą funkcji `Start()`.
11. Wróć do zakładki *Design* i kliknij dwukrotnie na dodany w tym ćwiczeniu timer aby dodać zdarzenie `Tick`
12. Wewnątrz zdarzenia wykonaj poniższe kroki:
    1. Zwiększ wartość zmiennej `stanLicznika` o 1.
    2. Ustaw tekst kontrolki Label tak, aby wyświetlała wartość zmiennej `stanLicznika`. Podpowiedź:

      ```csharp
      licznik.Text = stanLicznika.ToString()
      ```

13. Uruchom program i wciśnij przycisk *Licz*, poczekaj chwilę, licznik na powinien się zmieniać co około 1sek. Po ponownym wciśnięciu licznik powinien się zatrzymać i wyzerować.

![Gotowa aplikacja](Grafiki/screen6.png)

## Ćwiczenia DODATKOWE

1. Zmodyfikuj część dotyczącą ustawiania tekstu, tak, aby po odliczeniu zadanego czasu zmieniał się tekst na jeden, losowo wybrany tekst z kilku  (wybierz sam jakie).
2. Zmodyfikuj część dotyczącą timera.
   1. Zrób tak, aby przycisk miał domyślnie tekst "START", po kliknięciu na niego zmienił się na "STOP" i aktywował liczenie.
   2. Po kliknięciu ponownie na ten sam przycisk, ustaw ponownie napis na "START" i zatrzymawał się timer oraz wyzeruj licznik.
   3. Zmodyfikuj program tak, aby po zatrzymaniu timera nie zerował się licznik, a po ponownym wciśnięciu "START" niech licznik zwiększa się dalej o 1. Na przykład: Wciskamy START -> Czekamy 10sek -> Licznik ma: 10 -> Wciskamy STOP -> czekamy np. 5sek -> Licznik nadal wskazuje 10 -> Wciskamy START i licznik liczy dalej od 10.

## Wyślij swoją pracę

W celu zaliczenia obecności wyśli projekt aplikacji na podstawie opisu [stąd](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-okienkowej).

W tytule maila proszę podać: `Zajęcia Zdalne - Timer cz. 1`.
